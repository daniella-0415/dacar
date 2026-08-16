import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    function logout() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        localStorage.removeItem("auth");

        alert("Logged out successfully.");

        navigate("/signin");
    }

    return (
        <div className="dashboard">

            <div className="dashboard-card">

                <div className="dashboard-header">
                    <h1>DaCars</h1>
                    <h2>Dashboard</h2>

                    <p>
                        You have successfully signed in.
                    </p>
                </div>


                {user && (
                    <div className="user-info">

                        <h3>User Information</h3>

                        <div className="user-detail">
                            <span>Name</span>
                            <strong>
                                {user.firstName} {user.lastName}
                            </strong>
                        </div>

                        <div className="user-detail">
                            <span>Email</span>
                            <strong>
                                {user.email}
                            </strong>
                        </div>

                    </div>
                )}


                <div className="dashboard-actions">

                    <button
                        type="button"
                        className="cars-button"
                        onClick={() => navigate("/cars")}
                    >

                        <span>
                            View Available Cars
                        </span>
                    </button>


                    <button
                        type="button"
                        className="bookings-button"
                        onClick={() => navigate("/my-bookings")}
                    >

                        <span>
                            My Bookings
                        </span>
                    </button>


                    <button
                        type="button"
                        className="logout-button"
                        onClick={logout}
                    >
                        <span>
                            Logout
                        </span>
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;