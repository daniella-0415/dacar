import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Location from "./pages/Location";
import Review from "./pages/Review";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* =========================
                    HOME
                ========================== */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* =========================
                    AUTHENTICATION
                ========================== */}

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                <Route
                    path="/signin"
                    element={<Signin />}
                />


                {/* =========================
                    PROTECTED DASHBOARD
                ========================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    CARS
                ========================== */}

                <Route
                    path="/cars"
                    element={
                        <ProtectedRoute>
                            <Cars />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    CAR DETAILS
                ========================== */}

                <Route
                    path="/cars/:id"
                    element={
                        <ProtectedRoute>
                            <CarDetails />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    BOOKING
                ========================== */}

                <Route
                    path="/booking/:id"
                    element={
                        <ProtectedRoute>
                            <Booking />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    PAYMENT
                ========================== */}

                <Route
                    path="/payment/:id"
                    element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    PAYMENT SUCCESS
                ========================== */}

                <Route
                    path="/payment-success"
                    element={
                        <ProtectedRoute>
                            <PaymentSuccess />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    MY BOOKINGS
                ========================== */}

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookings />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    LOCATION
                ========================== */}

                <Route
                    path="/location"
                    element={
                        <ProtectedRoute>
                            <Location />
                        </ProtectedRoute>
                    }
                />


                {/* =========================
                    REVIEW
                ========================== */}

                <Route
                    path="/review/:id"
                    element={
                        <ProtectedRoute>
                            <Review />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;