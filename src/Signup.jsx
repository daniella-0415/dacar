import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.password ||
      !user.confirmPassword
    ) {
      alert("Please complete all fields.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Account created successfully!");

      navigate("/signin");

    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-container">

      <div className="overlay"></div>

      <div className="signup-card">

        <h1>DaCars</h1>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={user.firstName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={user.lastName}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p>
          Already have an account?{" "}
          <Link to="/signin">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;