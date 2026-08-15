import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Booking.css";

function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        startDate: "",
        endDate: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const RATE_PER_HOUR = 350;

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function calculateHours() {
        if (!formData.startDate || !formData.endDate) {
            return 0;
        }

        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);

        const difference = end - start;

        if (difference <= 0) {
            return 0;
        }

        // Charge for every started hour
        return Math.ceil(
            difference / (1000 * 60 * 60)
        );
    }

    const hours = calculateHours();
    const totalAmount = hours * RATE_PER_HOUR;

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        const auth = localStorage.getItem("auth");

        if (!auth) {
            setError("Please sign in first.");
            return;
        }

        if (
            !formData.startDate ||
            !formData.endDate
        ) {
            setError(
                "Please select both dates."
            );
            return;
        }

        if (
            new Date(formData.endDate) <=
            new Date(formData.startDate)
        ) {
            setError(
                "End date must be after the start date."
            );
            return;
        }

        if (hours <= 0) {
            setError(
                "Please select a valid rental period."
            );
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:3000/bookings",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Basic ${auth}`
                    },

                    body: JSON.stringify({
                        carId: id,
                        startDate:
                            formData.startDate,
                        endDate:
                            formData.endDate
                    })
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Unable to create booking."
                );
            }

            alert(
                "Booking created successfully!"
            );

            /*
                Send the rental dates to Payment.

                The customer does NOT need to enter
                a booking ID or amount.
            */

            navigate(`/payment/${id}`, {
                state: {
                    startDate:
                        formData.startDate,

                    endDate:
                        formData.endDate,

                    booking:
                        data
                }
            });

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="booking-page">

            <div className="booking-card">

                <h1>DaCars</h1>

                <h2>Book a Car</h2>

                <p className="booking-text">
                    Select your rental dates below.
                </p>

                {error && (
                    <div className="booking-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>
                        Start Date
                    </label>

                    <input
                        type="datetime-local"
                        name="startDate"
                        value={
                            formData.startDate
                        }
                        onChange={
                            handleChange
                        }
                        required
                    />

                    <label>
                        End Date
                    </label>

                    <input
                        type="datetime-local"
                        name="endDate"
                        value={
                            formData.endDate
                        }
                        onChange={
                            handleChange
                        }
                        required
                    />

                    {/* PRICE PREVIEW */}

                    {hours > 0 && (
                        <div className="booking-summary">

                            <h3>
                                Rental Summary
                            </h3>

                            <p>
                                <span>
                                    Rental Hours:
                                </span>

                                <strong>
                                    {hours}{" "}
                                    {hours === 1
                                        ? "hour"
                                        : "hours"}
                                </strong>
                            </p>

                            <p>
                                <span>
                                    Rate:
                                </span>

                                <strong>
                                    R{RATE_PER_HOUR}
                                    {" "}
                                    / hour
                                </strong>
                            </p>

                            <div className="booking-total">

                                <span>
                                    Estimated Total:
                                </span>

                                <strong>
                                    R
                                    {totalAmount.toLocaleString(
                                        "en-ZA"
                                    )}
                                </strong>

                            </div>

                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Booking..."
                            : "Confirm Booking"}
                    </button>

                </form>

                <button
                    type="button"
                    className="back-button"
                    onClick={() =>
                        navigate(
                            `/cars/${id}`
                        )
                    }
                >
                    ← Back to Car
                </button>

            </div>

        </div>
    );
}

export default Booking;