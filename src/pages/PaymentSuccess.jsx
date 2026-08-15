import { useNavigate, useLocation } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {

    const navigate = useNavigate();
    const location = useLocation();

    const payment = location.state?.payment;

    return (
        <div className="success-page">

            <div className="success-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>Payment Successful!</h1>

                <p className="success-message">
                    Your DaCars booking has been confirmed.
                </p>

                {payment && (
                    <div className="payment-summary">

                        <h3>Payment Details</h3>

                        {payment.bookingId && (
                            <p>
                                <strong>Booking ID:</strong>{" "}
                                {payment.bookingId}
                            </p>
                        )}

                        {payment.paymentId && (
                            <p>
                                <strong>Payment ID:</strong>{" "}
                                {payment.paymentId}
                            </p>
                        )}

                        {payment.amount && (
                            <p>
                                <strong>Amount:</strong>{" "}
                                R{payment.amount}
                            </p>
                        )}

                        {payment.paymentMethod && (
                            <p>
                                <strong>Payment Method:</strong>{" "}
                                {payment.paymentMethod}
                            </p>
                        )}

                    </div>
                )}

                <div className="success-buttons">

                    <button
                        onClick={() => navigate("/my-bookings")}
                    >
                        View My Bookings
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/cars")}
                    >
                        Browse More Cars
                    </button>

                    <button
                        className="home-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PaymentSuccess;