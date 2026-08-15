import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MyBookings.css";

function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    async function fetchBookings() {

        try {

            const auth = localStorage.getItem("auth");

            if (!auth) {
                throw new Error("Please sign in first.");
            }

            const response = await fetch(
                "http://localhost:3000/bookings/my-bookings",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Basic ${auth}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to load bookings."
                );
            }

            setBookings(data);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }
    }

    function formatDate(date) {

        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleString();
    }

    if (loading) {

        return (
            <div className="bookings-message">
                <h2>Loading Your Bookings...</h2>
            </div>
        );

    }

    if (error) {

        return (
            <div className="bookings-message">

                <h2>{error}</h2>

                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>

            </div>
        );

    }

    return (

        <div className="bookings-page">

            <div className="bookings-container">

                <div className="bookings-header">

                    <div>
                        <h1>My Bookings</h1>

                        <p>
                            View your DaCars rental bookings.
                        </p>
                    </div>

                    <button
                        className="back-dashboard-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Dashboard
                    </button>

                </div>

                {bookings.length === 0 ? (

                    <div className="no-bookings">

                        <h2>No Bookings Yet</h2>

                        <p>
                            You have not made any car bookings.
                        </p>

                        <button
                            onClick={() => navigate("/cars")}
                        >
                            Browse Cars
                        </button>

                    </div>

                ) : (

                    <div className="bookings-grid">

                        {bookings.map((booking) => (

                            <div
                                className="booking-card"
                                key={booking._id}
                            >

                                <div className="booking-card-header">

                                    <h2>
                                        Car Booking
                                    </h2>

                                    <span
                                        className={`booking-status ${booking.status}`}
                                    >
                                        {booking.status}
                                    </span>

                                </div>

                                <div className="booking-info">

                                    <p>
                                        <strong>
                                            Booking ID:
                                        </strong>{" "}
                                        {booking._id}
                                    </p>

                                    <p>
                                        <strong>
                                            Start Date:
                                        </strong>{" "}
                                        {formatDate(
                                            booking.startDate
                                        )}
                                    </p>

                                    <p>
                                        <strong>
                                            End Date:
                                        </strong>{" "}
                                        {formatDate(
                                            booking.endDate
                                        )}
                                    </p>

                                    <p>
                                        <strong>
                                            Created:
                                        </strong>{" "}
                                        {formatDate(
                                            booking.createdAt
                                        )}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );
}

export default MyBookings;