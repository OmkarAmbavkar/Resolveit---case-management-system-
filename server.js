const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 🌐 Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// 🧾 Define Schemas
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  street: String,
  city: String,
  zipCode: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: String,
  photo: String,
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const caseSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  image: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

// 🧩 Models
const User = mongoose.model("User", userSchema);
const Case = mongoose.model("Case", caseSchema);

// 🚀 App Setup
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 📁 Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 📸 Multer Config
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// 🔐 JWT Middleware
const JWT_SECRET = "your_jwt_secret_key"; // Replace with env variable in production

function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}

// 🧍 Signup (Updated)
app.post("/api/signup", async (req, res) => {
  try {
    console.log("Signup request body:", req.body);

    const {
      name,
      age,
      gender,
      street,
      city,
      zipCode,
      email,
      phone,
      password,
      role,
    } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({
      name,
      age,
      gender,
      street,
      city,
      zipCode,
      email,
      phone,
      password,
      role,
    });

    await newUser.save();
    console.log("✅ User registered:", newUser);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// 🔑 Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// 🧍 Register User with Photo
app.post("/api/register_user", upload.single("photo"), async (req, res) => {
  try {
    const { name, age, gender, street, city, zipCode, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Name, email, phone, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({
      name,
      age,
      gender,
      street,
      city,
      zipCode,
      email,
      phone,
      password,
      role,
      photo: req.file?.filename || null,
    });

    await newUser.save();
    console.log("✅ User saved:", newUser);
    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ message: "Server error while registering user." });
  }
});

// 📂 Get All Users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users." });
  }
});

// 📝 Register Case
app.post("/api/register_case", upload.single("image"), async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: "Title, description, and location are required." });
    }

    const newCase = new Case({
      title,
      description,
      location,
      image: req.file?.filename || null,
    });

    await newCase.save();
    console.log("✅ Case saved:", newCase);
    res.status(200).json({ message: "Case registered successfully!", imageUrl: `/uploads/${req.file?.filename}` });
  } catch (error) {
    console.error("❌ Error registering case:", error);
    res.status(500).json({ message: "Server error while registering case." });
  }
});

// 📂 Get All Cases
app.get("/api/cases", async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.status(200).json(cases);
  } catch (error) {
    console.error("❌ Error fetching cases:", error);
    res.status(500).json({ message: "Server error while fetching cases." });
  }
});

// 🔄 Update Case Status (Admin Only)
app.patch("/api/update_case/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { status } = req.body;
    const updated = await Case.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Case not found." });
    }

    console.log("✅ Case status updated:", updated);
    res.status(200).json({ message: "Status updated", case: updated });
  } catch (error) {
    console.error("❌ Error updating case status:", error);
    res.status(500).json({ message: "Server error while updating status." });
  }
});

// 🟢 Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
