import { useNavigate, useLocation } from "react-router-dom";
import "./Location.css";

function Location() {
  const navigate = useNavigate();
  const routeLocation = useLocation();

  const car = routeLocation.state?.car;

  if (!car) {
    return (
      <main className="location-page">
        <div className="location-shell">
          <button
            className="location-back-link"
            onClick={() => navigate("/cars")}
          >
            ← Back to our fleet
          </button>

          <section className="location-empty-card">
            <div className="location-empty-icon">⌖</div>
            <span className="location-eyebrow">VEHICLE FINDER</span>
            <h1>Location not found</h1>
            <p>
              We couldn't find the selected car. Return to our fleet
              and choose a vehicle to see its location.
            </p>

            <button
              className="location-primary-btn"
              onClick={() => navigate("/cars")}
            >
              Explore our fleet <span>↗</span>
            </button>
          </section>
        </div>
      </main>
    );
  }

  const carName =
    car.name ||
    [car.make, car.model].filter(Boolean).join(" ") ||
    "Selected vehicle";

  const rawLocation =
    typeof car.location === "string"
      ? car.location.trim()
      : typeof car.address === "string"
      ? car.address.trim()
      : "";

  // Do not pretend a generic placeholder is a real address.
  const isPlaceholder =
    !rawLocation ||
    /^(main dacars branch|unknown|location not available|not provided)$/i.test(
      rawLocation
    );

  const actualLocation = isPlaceholder ? "" : rawLocation;

  const carImage = [
    car.image,
    car.imageUrl,
    car.imageURL,
    car.photo,
  ].find((image) => typeof image === "string" && image.trim());

  const available = car.available === true;
  const unavailable = car.available === false;

  const mapEmbedUrl = actualLocation
    ? `https://maps.google.com/maps?q=${encodeURIComponent(
        actualLocation
      )}&z=14&output=embed`
    : "";

  const googleMapsUrl = actualLocation
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        actualLocation
      )}`
    : "";

  return (
    <main className="location-page">
      <div className="location-shell">

        {/* Top navigation */}
        <div className="location-topbar">
          <button
            className="location-back-link"
            onClick={() => navigate(-1)}
          >
            <span>←</span> Back
          </button>

          <div className="location-breadcrumb">
            <span>DaCars</span>
            <span>/</span>
            <span>Our Fleet</span>
            <span>/</span>
            <strong>Vehicle Location</strong>
          </div>
        </div>

        {/* Page heading */}
        <section className="location-heading">
          <span className="location-eyebrow">
            <span className="location-eyebrow-dot" />
            YOUR NEXT DRIVE STARTS HERE
          </span>

          <h1>
            Find your <span>next drive.</span>
          </h1>

          <p>
            Explore your selected vehicle's location before you book.
            Your next journey is closer than you think.
          </p>
        </section>

        {/* Map and vehicle details */}
        <section className="location-layout">

          {/* Actual map */}
          <div className="location-map-card">
            <div className="location-map-header">
              <div>
                <span className="location-map-label">
                  <span className="location-live-dot" />
                  LOCATION VIEW
                </span>

                <h2>Find your vehicle</h2>

                <p>
                  {actualLocation
                    ? actualLocation
                    : "A location address is required"}
                </p>
              </div>

              <span className="location-map-badge">
                MAP
              </span>
            </div>

            <div className="location-map-frame">
              {actualLocation ? (
                <iframe
                  key={actualLocation}
                  title={`${carName} location on Google Maps`}
                  src={mapEmbedUrl}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="location-map-empty">
                  <div className="location-map-pin">⌖</div>

                  <h3>Location needed</h3>

                  <p>
                    Add the real street address, suburb, or city for
                    this car to display it on the map.
                  </p>
                </div>
              )}

              <div className="location-map-overlay-label">
                <span className="location-map-small-dot" />
                {actualLocation ? "SELECTED LOCATION" : "AWAITING ADDRESS"}
              </div>
            </div>

            <div className="location-map-footer">
              <span className="location-map-footer-icon">⌖</span>

              <p>
                {actualLocation
                  ? "Check the surrounding area using the interactive map."
                  : "The map will appear once a real vehicle location is saved."}
              </p>

              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="location-external-link"
                >
                  Open Maps ↗
                </a>
              )}
            </div>
          </div>

          {/* Selected vehicle details */}
          <aside className="location-details-card">
            <div className="location-details-top">
              <span className="location-eyebrow">
                YOUR SELECTED RIDE
              </span>

              <span
                className={`location-availability ${
                  unavailable
                    ? "is-unavailable"
                    : available
                    ? "is-available"
                    : "is-unknown"
                }`}
              >
                <span />
                {available
                  ? "Available"
                  : unavailable
                  ? "Unavailable"
                  : "Check availability"}
              </span>
            </div>

            <div className="location-car-visual">
              {carImage ? (
                <img src={carImage} alt={carName} />
              ) : (
                <div className="location-car-placeholder">
                  <span>DC</span>
                  <small>DACARS COLLECTION</small>
                </div>
              )}

              <div className="location-car-visual-shade" />

              <span className="location-car-visual-tag">
                DACARS / VEHICLE
              </span>
            </div>

            <div className="location-car-info">
              <span className="location-detail-label">
                SELECTED VEHICLE
              </span>

              <h2>{carName}</h2>

              <span className="location-category">
                {car.category || "DaCars Fleet"}
              </span>
            </div>

            <div className="location-details-divider" />

            <div className="location-info-row">
              <span className="location-info-icon">⌖</span>

              <div>
                <small>VEHICLE LOCATION</small>

                <strong>
                  {actualLocation || "Address not provided"}
                </strong>
              </div>
            </div>

            <div className="location-info-row">
              <span className="location-info-icon">✓</span>

              <div>
                <small>AVAILABILITY</small>

                <strong>
                  {available
                    ? "Ready to book"
                    : unavailable
                    ? "Currently unavailable"
                    : "Confirmation required"}
                </strong>
              </div>
            </div>

            <div className="location-info-row">
              <span className="location-info-icon">↗</span>

              <div>
                <small>YOUR NEXT STEP</small>

                <strong>
                  {unavailable
                    ? "Choose another vehicle"
                    : "Continue to booking"}
                </strong>
              </div>
            </div>

            <div className="location-actions">
              <button
                className="location-secondary-btn"
                onClick={() => navigate(-1)}
              >
                Go back
              </button>

              <button
                className="location-primary-btn"
                disabled={unavailable}
                onClick={() =>
                  navigate("/booking", {
                    state: { car },
                  })
                }
              >
                {unavailable ? "Unavailable" : "Book this car"}
                {!unavailable && <span>↗</span>}
              </button>
            </div>

            <p className="location-security-note">
              <span>✓</span>
              Review your vehicle details before confirming a booking.
            </p>
          </aside>
        </section>

        {/* Bottom section */}
        <section className="location-bottom-note">
          <div>
            <span className="location-bottom-symbol">D</span>

            <div>
              <strong>Your plans. Your pace.</strong>
              <p>Choose your ride and make the journey yours.</p>
            </div>
          </div>

          <button onClick={() => navigate("/cars")}>
            Explore more cars <span>↗</span>
          </button>
        </section>

      </div>
    </main>
  );
}

export default Location;