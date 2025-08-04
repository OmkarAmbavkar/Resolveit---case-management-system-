"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function RegisterUserPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await axios.post("http://localhost:5000/api/register_user", formData);
      setMessage("✅ User registered successfully!");
      reset();
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setMessage("❌ Failed to register user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-8 rounded shadow">
        <h2 className="text-3xl font-bold mb-6 text-center">Register User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register("name", { required: true })} placeholder="Name" className="input" />
          <input {...register("age", { required: true })} type="number" placeholder="Age" className="input" />
          <select {...register("gender", { required: true })} className="input">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input {...register("street", { required: true })} placeholder="Street" className="input" />
          <input {...register("city", { required: true })} placeholder="City" className="input" />
          <input {...register("zipCode", { required: true })} placeholder="Zip Code" className="input" />
          <input {...register("email", { required: true })} type="email" placeholder="Email" className="input" />
          <input {...register("phone", { required: true })} placeholder="Phone Number" className="input" />
          <input {...register("photo", { required: true })} type="file" className="input" />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}
