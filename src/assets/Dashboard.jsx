import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");

        alert("Logged out successfully.");

        navigate("/signin");

    }

    return (

        <div className="dashboard">

            <div className="dashboard-card">

                <h1>Welcome to DaCars</h1>

                <h2>Protected Dashboard</h2>

                <p>
                    You have successfully signed in.
                </p>

                {user && (

                    <div className="user-info">

                        <h3>User Information</h3>

                        <p>
                            <strong>Name:</strong>{" "}
                            {user.firstName} {user.lastName}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {user.email}
                        </p>

                    </div>

                )}

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Dashboard;