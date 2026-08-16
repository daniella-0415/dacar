import { useNavigate, useLocation } from "react-router-dom";
import "./Location.css";

function Location() {
    const navigate = useNavigate();
    const location = useLocation();

    const car = location.state?.car;

    if (!car) {
        return (
            <div className="location-page">
                <div className="location-card">
                    <h1>Location Not Found</h1>

                    <p>
                        No car information was provided.
                    </p>

                    <button onClick={() => navigate("/cars")}>
                        Back to Cars
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="location-page">

            <div className="location-card">

                <h1>Car Location</h1>

                <h2>{car.name}</h2>

                <div className="location-info">

                    <p>
                        <strong>Category:</strong>{" "}
                        {car.category}
                    </p>

                    <p>
                        <strong>Location:</strong>{" "}
                        {car.location || "Main DaCars Branch"}
                    </p>

                    <p>
                        <strong>Availability:</strong>{" "}
                        {car.available
                            ? "Available"
                            : "Unavailable"}
                    </p>

                </div>

                <div className="map-container">

                    <div className="map-placeholder">

                        <span></span>

                        <h3>
                            DaCars Location
                        </h3>

                        <p>
                            {car.location ||
                                "Main DaCars Branch"}
                        </p>

                    </div>

                </div>

                <div className="location-buttons">

                    <button
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                         Back
                    </button>

                    <button
                        className="booking-btn"
                        onClick={() =>
                            navigate("/booking", {
                                state: { car }
                            })
                        }
                    >
                        Book This Car
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Location;