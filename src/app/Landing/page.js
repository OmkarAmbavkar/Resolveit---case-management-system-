export default function LandingPage() {
  return (
    <div>
      <header>
        <h1>Welcome to ResolveIt</h1>
        <p>Your modern support dashboard UI</p>
      </header>

      <section>
        <img src="/images/hero-ui.png" alt="Hero" />
      </section>

      <section style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
        <div>
          <img src="/images/card-ui-1.png" alt="Dashboard" />
          <h2>Dashboard</h2>
          <p>Track everything with a clean layout.</p>
        </div>
        <div>
          <img src="/images/card-ui-2.png" alt="Analytics" />
          <h2>Analytics</h2>
          <p>Visualize your data with clarity.</p>
        </div>
      </section>

      <footer>
        <p>Made with ❤️ by ResolveIt</p>
      </footer>
    </div>
  );
}
