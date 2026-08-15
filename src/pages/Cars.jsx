import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cars.css";

function Cars() {
    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Different fallback images for different cars
    const carImages = [
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800",
        "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=800",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=800",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800"
    ];

    useEffect(() => {
        fetchCars();
    }, []);

    async function fetchCars() {
        try {
            // Get the saved authentication credentials
            const auth = localStorage.getItem("auth");

            // Make sure the user is logged in
            if (!auth) {
                throw new Error("Please sign in first.");
            }

            const response = await fetch(
                "http://localhost:3000/cars",
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
                    data.error || "Failed to load cars."
                );
            }

            setCars(data);

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    }

    function viewDetails(car) {
        navigate(`/cars/${car._id}`);
    }

    if (loading) {
        return (
            <div className="loading">
                <h2>Loading Cars...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h2>{error}</h2>

                <button onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="cars-container">

            <div className="cars-header">

                <div>
                    <h1>Available Cars</h1>

                    <p>
                        Choose a car for your next journey.
                    </p>
                </div>

                <button
                    className="back-dashboard-btn"
                    onClick={() => navigate("/dashboard")}
                >
                    ← Dashboard
                </button>

            </div>

            {cars.length === 0 ? (

                <div className="no-cars">
                    <h2>No Cars Available</h2>

                    <p>
                        There are currently no cars available for rental.
                    </p>
                </div>

            ) : (

                <div className="cars-grid">

                    {cars.map((car, index) => (

                        <div
                            className="car-card"
                            key={car._id}
                        >

                            <img
                                src={
                                    car.image ||
                                    carImages[
                                        index % carImages.length
                                    ]
                                }
                                alt={car.name}
                                className="car-image"
                            />

                            <div className="car-card-content">

                                <h2>
                                    {car.name}
                                </h2>

                                <p>
                                    <strong>
                                        Category:
                                    </strong>{" "}
                                    {car.category}
                                </p>

                                <p className="price">
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

                                <button
                                    className="details-btn"
                                    onClick={() =>
                                        viewDetails(car)
                                    }
                                >
                                    View Details
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Cars;