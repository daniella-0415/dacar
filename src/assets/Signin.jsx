import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signin.css";

function Signin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:3000/signin",
                formData
            );

            alert(response.data.message);

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            if (error.response) {
                alert(error.response.data.error);
            } else {
                alert("Unable to connect to the server.");
            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="signin-page">

            <div className="signin-card">

                <h1>DaCars</h1>

                <h2>Sign In</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <p>

                    Don't have an account?

                    <Link to="/signup">

                        Sign Up

                    </Link>

                </p>

                <Link className="home-link" to="/">

                    ← Back Home

                </Link>

            </div>

        </div>

    );

}

export default Signin;