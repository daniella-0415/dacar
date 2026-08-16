import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home">

            <nav className="navbar">

                <Link to="/" className="logo">
                    Da<span>Cars</span>
                </Link>

                <div className="nav-links">

                    <Link to="/">Home</Link>

                    <Link to="/signup">Sign Up</Link>

                    <Link to="/signin">Sign In</Link>

                </div>

            </nav>

            <section className="hero">

                <div className="hero-overlay"></div>

                <div className="hero-content">

                    <p className="hero-small">
                        PREMIUM CAR RENTALS
                    </p>

                    <h1>
                        YOUR JOURNEY.
                        <br />
                        <span>YOUR CAR.</span>
                    </h1>

                    <p className="hero-description">
                        Experience premium vehicles without the
                        long-term commitment. Rent by the hour,
                        choose your car and hit the road.
                    </p>

                    <div className="hero-buttons">

                        <Link to="/signup">
                            <button className="primary-btn">
                                Explore Cars 
                            </button>
                        </Link>

                        <Link to="/signin">
                            <button className="outline-btn">
                                Sign In
                            </button>
                        </Link>

                    </div>

                </div>

            </section>

            <section className="booking-search">

                <div className="booking-title">

                    <p>READY TO DRIVE?</p>

                    <h2>
                        Find Your Perfect Ride
                    </h2>

                </div>

                <div className="booking-options">

                    <div className="search-item">

                        <span className="search-icon">
                            
                        </span>

                        <div>
                            <small>LOCATION</small>

                            <strong>
                                Choose a location
                            </strong>
                        </div>

                    </div>


                    <div className="search-item">

                        <span className="search-icon">
                            
                        </span>

                        <div>
                            <small>VEHICLE</small>

                            <strong>
                                Choose your car
                            </strong>
                        </div>

                    </div>


                    <Link
                        to="/cars"
                        className="find-car-btn"
                    >
                        Find Cars
                    </Link>

                </div>

            </section>


            <section className="stats">

                <div className="stat">

                    <h2>24/7</h2>

                    <p>BOOKING ACCESS</p>

                </div>

                <div className="stat">

                    <h2>R350</h2>

                    <p>STARTING PER HOUR</p>

                </div>

                <div className="stat">

                    <h2>100%</h2>

                    <p>ONLINE BOOKING</p>

                </div>

                <div className="stat">

                    <h2>4+</h2>

                    <p>VEHICLE CATEGORIES</p>

                </div>

            </section>


            <section className="categories">

                <div className="section-heading">

                    <div>

                        <p>EXPLORE OUR FLEET</p>

                        <h2>
                            Find Your Perfect Drive
                        </h2>

                    </div>

                    <Link to="/cars">
                        View All Cars →
                    </Link>

                </div>


                <div className="category-grid">


                    <Link
                        to="/cars"
                        className="category-card luxury"
                    >

                        <div className="category-overlay"></div>

                        <div className="category-content">

                            <span>
                                01
                            </span>

                            <h3>
                                Luxury
                            </h3>

                            <p>
                                Premium vehicles for
                                unforgettable journeys.
                            </p>

                        </div>

                    </Link>


                    <Link
                        to="/cars"
                        className="category-card sports"
                    >

                        <div className="category-overlay"></div>

                        <div className="category-content">

                            <span>
                                02
                            </span>

                            <h3>
                                Sports
                            </h3>

                            <p>
                                Performance and power
                                whenever you need it.
                            </p>

                        </div>

                    </Link>


                    <Link
                        to="/cars"
                        className="category-card suv">

                        <div className="category-overlay"></div>

                        <div className="category-content">

                            <span>
                                03
                            </span>

                            <h3>
                                SUVs
                            </h3>

                            <p>
                                Space, comfort and
                                confidence on every road.
                            </p>

                        </div>

                    </Link>


                    <Link
                        to="/cars"
                        className="category-card economy" >

                        <div className="category-overlay"></div>

                        <div className="category-content">

                            <span>
                                04
                            </span>

                            <h3>
                                Economy
                            </h3>

                            <p>
                                Reliable cars at
                                affordable prices.
                            </p>

                        </div>

                    </Link>

                </div>

            </section>

            <section className="how-it-works">

                <div className="section-heading center">

                    <p>HOW IT WORKS</p>

                    <h2>
                        Your Car. Three Simple Steps.
                    </h2>

                </div>


                <div className="steps">

                    <div className="step">

                        <div className="step-number">
                            01
                        </div>

                        <h3>
                            Choose Your Car
                        </h3>

                        <p>
                            Browse our selection of premium
                            vehicles and find the one that
                            fits your journey.
                        </p>

                    </div>


                    <div className="step">

                        <div className="step-number">
                            02
                        </div>

                        <h3>
                            Pick Your Time
                        </h3>

                        <p>
                            Select your start and end time.
                            Pay only for the hours you need.
                        </p>

                    </div>


                    <div className="step">

                        <div className="step-number">
                            03
                        </div>

                        <h3>
                            Drive Away
                        </h3>

                        <p>
                            Complete your booking and
                            get ready to enjoy your ride.
                        </p>

                    </div>

                </div>

            </section>



            <section className="why-dacars">

                <div className="why-image"></div>

                <div className="why-content">

                    <p className="section-label">
                        WHY DACARS?
                    </p>

                    <h2>
                        More Than Just
                        <br />
                        A Car Rental.
                    </h2>

                    <p className="why-description">
                        DaCars makes renting a premium vehicle
                        simple, flexible and convenient. Whether
                        you need a car for a few hours or an entire
                        day, we've got you covered.
                    </p>


                    <div className="benefits">

                        <div className="benefit">

                            <span>.</span>

                            <div>

                                <h3>
                                    Flexible Rentals
                                </h3>

                                <p>
                                    Rent by the hour and only
                                    pay for the time you use.
                                </p>

                            </div>

                        </div>


                        <div className="benefit">

                            <span>.</span>

                            <div>

                                <h3>
                                    Premium Vehicles
                                </h3>

                                <p>
                                    Choose from carefully selected
                                    vehicles for every occasion.
                                </p>

                            </div>

                        </div>


                        <div className="benefit">

                            <span>.</span>

                            <div>

                                <h3>
                                    Easy Booking
                                </h3>

                                <p>
                                    Book your vehicle online in
                                    just a few simple steps.
                                </p>

                            </div>

                        </div>

                    </div>

                    <Link to="/cars">

                        <button className="primary-btn">
                            Explore Our Cars 
                        </button>

                    </Link>

                </div>

            </section>



            <section className="final-cta">

                <div className="cta-overlay"></div>

                <div className="cta-content">

                    <p>
                        YOUR NEXT ADVENTURE STARTS HERE
                    </p>

                    <h2>
                        Ready To Hit
                        <br />
                        The Road?
                    </h2>

                    <Link to="/signup">

                        <button className="primary-btn">
                            Start Your Journey 
                        </button>

                    </Link>

                </div>

            </section>


            <footer className="footer">

                <div className="footer-main">

                    <div className="footer-brand">

                        <h2>
                            Da<span>Cars</span>
                        </h2>

                        <p>
                            Premium car rentals made simple.
                            Choose your car. Choose your time.
                            Hit the road.
                        </p>

                    </div>


                    <div className="footer-column">

                        <h3>
                            Explore
                        </h3>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/cars">
                            Cars
                        </Link>

                        <Link to="/signup">
                            Sign Up
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h3>
                            Account
                        </h3>

                        <Link to="/signin">
                            Sign In
                        </Link>

                        <Link to="/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/my-bookings">
                            My Bookings
                        </Link>

                    </div>


                    <div className="footer-column">

                        <h3>
                            DaCars
                        </h3>

                        <Link to="/location">
                            Locations
                        </Link>

                        <Link to="/cars">
                            Our Fleet
                        </Link>

                    </div>

                </div>


                <div className="footer-bottom">

                    <p>
                        © 2026 DaCars. All Rights Reserved.
                    </p>

                    <p>
                        Drive with confidence.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;