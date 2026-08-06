import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Navigation */}

      <nav className="navbar">

        <h2 className="logo">DaCars</h2>

        <div className="nav-links">

          <Link to="/">Home</Link>

          <Link to="/signup">Sign Up</Link>

          <Link to="/signin">Sign In</Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="hero">

        <div className="hero-overlay"></div>

        <div className="hero-content">

          <h1>Drive Your Dream Car Today</h1>

          <p>
            Discover luxury, sports and economy vehicles available
            for hourly or daily rental.
          </p>

          <div className="hero-buttons">

            <Link to="/signup">
              <button className="btn-primary">
                Get Started
              </button>
            </Link>

            <Link to="/signin">
              <button className="btn-secondary">
                Sign In
              </button>
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>Why Choose DaCars?</h2>

        <div className="cards">

          <div className="card">
            <h3> Premium Cars</h3>
            <p>
              Choose from luxury SUVs,
              sports cars and everyday vehicles.
            </p>
          </div>

          <div className="card">
            <h3> Hourly Rentals</h3>
            <p>
              Pay only for the hours you need.
            </p>
          </div>

          <div className="card">
            <h3> Multiple Locations</h3>
            <p>
              Pick up your car from convenient
              branches near you.
            </p>
          </div>

          <div className="card">
            <h3> Trusted Reviews</h3>
            <p>
              Read customer reviews before
              booking your vehicle.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer>

        <p>
          © 2026 DaCars. All Rights Reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;