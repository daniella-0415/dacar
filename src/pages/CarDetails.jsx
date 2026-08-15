import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CarDetails.css";

function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCarDetails();
    }, [id]);

    async function fetchCarDetails() {
        try {
            const auth = localStorage.getItem("auth");

            if (!auth) {
                throw new Error("Please sign in first.");
            }

            const response = await fetch(
                `http://localhost:3000/cars/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${auth}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to load car details."
                );
            }

            setCar(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function goBack() {
        navigate("/cars");
    }

    function viewLocation() {
        navigate("/location", {
            state: {
                car: car
            }
        });
    }

    function bookCar() {
        if (!car) {
            return;
        }

        navigate(`/booking/${car._id}`);
    }

    function leaveReview() {
        if (!car) {
            return;
        }

        navigate(`/review/${car._id}`);
    }

    if (loading) {
        return (
            <div className="car-details-message">
                <h2>Loading Car Details...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="car-details-message">
                <h2>{error}</h2>

                <button onClick={goBack}>
                    Back to Cars
                </button>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="car-details-message">
                <h2>Car not found.</h2>

                <button onClick={goBack}>
                    Back to Cars
                </button>
            </div>
        );
    }

    return (
        <div className="car-details-page">

            <div className="car-details-card">

                <img
                    src={
                        car.image ||
                        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
                    }
                    alt={car.name}
                    className="car-details-image"
                />

                <div className="car-details-content">

                    <h1>{car.name}</h1>

                    <p>
                        <strong>Category:</strong>{" "}
                        {car.category}
                    </p>

                    <p className="car-details-price">
                        R{car.pricePerHour} / Hour
                    </p>

                    <p
                        className={
                            car.available
                                ? "available"
                                : "unavailable"
                        }
                    >
                        {car.available
                            ? "Available"
                            : "Unavailable"}
                    </p>

                    {car.description && (
                        <div className="description">

                            <h3>Description</h3>

                            <p>
                                {car.description}
                            </p>

                        </div>
                    )}

                    <div className="car-details-buttons">

                        <button
                            className="back-btn"
                            onClick={goBack}
                        >
                            ← Back to Cars
                        </button>

                        <button
                            className="location-btn"
                            onClick={viewLocation}
                        >
                             View Location
                        </button>

                        <button
                            className="cart-btn"
                            onClick={bookCar}
                            disabled={!car.available}
                        >
                            {car.available
                                ? "Book Now"
                                : "Unavailable"}
                        </button>

                        <button
                            className="review-btn"
                            onClick={leaveReview}
                        >
                             Leave a Review
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CarDetails;