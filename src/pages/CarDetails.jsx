import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CarDetails.css";

function CarDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [carImage, setCarImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Same images used on the Cars page
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
        fetchCarDetails();
    }, [id]);

    async function fetchCarDetails() {
        try {
            const auth = localStorage.getItem("auth");

            if (!auth) {
                throw new Error("Please sign in first.");
            }

            // Get the selected car
            const carResponse = await fetch(
                `http://100.29.227.66:3000/cars/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${auth}`
                    }
                }
            );

            const carData = await carResponse.json();

            if (!carResponse.ok) {
                throw new Error(
                    carData.error ||
                    "Failed to load car details."
                );
            }

            setCar(carData);

            /*
             * If the database has its own image, use it.
             * Otherwise find the car's position in the
             * complete car list and use the matching
             * fallback image.
             */
            if (carData.image) {
                setCarImage(carData.image);
            } else {

                const carsResponse = await fetch(
                    "http://100.29.227.66:3000/cars",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Basic ${auth}`
                        }
                    }
                );

                const carsData = await carsResponse.json();

                if (!carsResponse.ok) {
                    throw new Error(
                        "Failed to load car images."
                    );
                }

                const carIndex = carsData.findIndex(
                    (item) => item._id === carData._id
                );

                if (carIndex !== -1) {
                    setCarImage(
                        carImages[
                            carIndex % carImages.length
                        ]
                    );
                } else {
                    setCarImage(carImages[0]);
                }
            }

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
                    src={carImage}
                    alt={car.name}
                    className="car-details-image"
                />

                <div className="car-details-content">

                    <h1>
                        {car.name}
                    </h1>

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