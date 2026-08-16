import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Payment.css";

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    const [booking, setBooking] = useState(null);
    const [car, setCar] = useState(null);

    const [startDate, setStartDate] = useState(
        location.state?.startDate || ""
    );

    const [endDate, setEndDate] = useState(
        location.state?.endDate || ""
    );

    const [paymentMethod, setPaymentMethod] =
        useState("card");

    const [cardData, setCardData] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState("");

    const RATE_PER_HOUR = 350;

    useEffect(() => {
        loadBookingAndCar();
    }, []);

    async function loadBookingAndCar() {
        try {
            const auth = localStorage.getItem("auth");

            if (!auth) {
                throw new Error("Please sign in first.");
            }

            const bookingsResponse = await fetch(
                "http://localhost:3000/bookings/my-bookings",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${auth}`
                    }
                }
            );

            const bookingsData =
                await bookingsResponse.json();

            if (!bookingsResponse.ok) {
                throw new Error(
                    bookingsData.error ||
                    "Unable to load booking."
                );
            }

            if (!bookingsData.length) {
                throw new Error(
                    "No booking found."
                );
            }

            const newestBooking =
                bookingsData.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                )[0];

            setBooking(newestBooking);

            if (!startDate) {
                setStartDate(
                    new Date(
                        newestBooking.startDate
                    )
                        .toISOString()
                        .slice(0, 16)
                );
            }

            if (!endDate) {
                setEndDate(
                    new Date(
                        newestBooking.endDate
                    )
                        .toISOString()
                        .slice(0, 16)
                );
            }

            const carResponse = await fetch(
                `http://localhost:3000/cars/${newestBooking.carId}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Basic ${auth}`
                    }
                }
            );

            const carData =
                await carResponse.json();

            if (!carResponse.ok) {
                throw new Error(
                    carData.error ||
                    "Unable to load car information."
                );
            }

            setCar(carData);

        } catch (err) {
            setError(err.message);

        } finally {
            setPageLoading(false);
        }
    }

    function calculateHours() {
        if (!startDate || !endDate) {
            return 0;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const difference = end - start;

        if (difference <= 0) {
            return 0;
        }

        return Math.ceil(
            difference / (1000 * 60 * 60)
        );
    }

    const hours = calculateHours();

    const totalAmount =
        hours * RATE_PER_HOUR;

    function handleCardChange(e) {
        setCardData({
            ...cardData,
            [e.target.name]: e.target.value
        });
    }

    function formatCardNumber(value) {
        const numbers =
            value.replace(/\D/g, "");

        return numbers
            .slice(0, 16)
            .replace(/(.{4})/g, "$1 ")
            .trim();
    }

    function handleCardNumberChange(e) {
        setCardData({
            ...cardData,
            cardNumber:
                formatCardNumber(
                    e.target.value
                )
        });
    }

    function handleExpiryChange(e) {
        let value =
            e.target.value.replace(
                /\D/g,
                ""
            );

        if (value.length >= 3) {
            value =
                value.slice(0, 2) +
                "/" +
                value.slice(2, 4);
        }

        setCardData({
            ...cardData,
            expiry: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        const auth =
            localStorage.getItem("auth");

        if (!auth) {
            setError(
                "Please sign in first."
            );
            return;
        }

        if (!booking) {
            setError(
                "Booking information is missing."
            );
            return;
        }

        if (hours <= 0) {
            setError(
                "Invalid rental duration."
            );
            return;
        }

    
        if (paymentMethod === "card") {

            const cardNumber =
                cardData.cardNumber.replace(
                    /\s/g,
                    ""
                );

            if (
                !cardData.cardName ||
                !cardNumber ||
                !cardData.expiry ||
                !cardData.cvv
            ) {
                setError(
                    "Please complete all card details."
                );
                return;
            }

            if (cardNumber.length !== 16) {
                setError(
                    "Card number must contain 16 digits."
                );
                return;
            }

            if (cardData.cvv.length !== 3) {
                setError(
                    "CVV must contain 3 digits."
                );
                return;
            }
        }

        setLoading(true);

        try {

            const response =
                await fetch(
                    "http://localhost:3000/payments",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                            Authorization:
                                `Basic ${auth}`
                        },

                       

                        body: JSON.stringify({
                            bookingId:
                                booking._id,

                            amount:
                                totalAmount,

                            paymentMethod:
                                paymentMethod
                        })
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Payment failed."
                );
            }

            alert(
                "Payment completed successfully!"
            );

            navigate(
                "/payment-success",
                {
                    state: {
                        payment: {
                            amount:
                                totalAmount,

                            hours:
                                hours,

                            ratePerHour:
                                RATE_PER_HOUR,

                            paymentMethod:
                                paymentMethod,

                            paymentId:
                                data.paymentId,

                            carName:
                                car?.name ||
                                "Rental Car",

                            startDate:
                                booking.startDate,

                            endDate:
                                booking.endDate
                        }
                    }
                }
            );

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

        return new Date(
            date
        ).toLocaleString();
    }

    if (pageLoading) {
        return (
            <div className="payment-page">

                <div className="payment-card">

                    <h1>DaCars</h1>

                    <h2>
                        Loading Payment...
                    </h2>

                    <p>
                        Preparing your
                        rental details.
                    </p>

                </div>

            </div>
        );
    }

    if (error && !booking) {
        return (
            <div className="payment-page">

                <div className="payment-card">

                    <h1>DaCars</h1>

                    <h2>
                        Payment Error
                    </h2>

                    <div className="payment-error">
                        {error}
                    </div>

                    <button
                        className="back-button"
                        onClick={() =>
                            navigate(
                                "/cars"
                            )
                        }
                    >
                        ← Back to Cars
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="payment-page">

            <div className="payment-container">

                {/* LEFT SIDE */}

                <div className="payment-card">

                    <div className="payment-header">

                        <span className="payment-icon">
                            
                        </span>

                        <div>
                            <h1>Payment</h1>

                            <p>
                                Secure checkout
                            </p>
                        </div>

                    </div>

                    {error && (
                        <div className="payment-error">
                            {error}
                        </div>
                    )}

                    <h3 className="section-title">
                        Choose Payment Method
                    </h3>

                    <div className="payment-methods">

                        <button
                            type="button"
                            className={
                                paymentMethod === "card"
                                    ? "method active"
                                    : "method"
                            }
                            onClick={() =>
                                setPaymentMethod(
                                    "card"
                                )
                            }
                        >
                            <span>
                                
                            </span>

                            <div>
                                <strong>
                                    Card
                                </strong>

                                <small>
                                    Visa, Mastercard
                                </small>
                            </div>
                        </button>

                        <button
                            type="button"
                            className={
                                paymentMethod === "eft"
                                    ? "method active"
                                    : "method"
                            }
                            onClick={() =>
                                setPaymentMethod(
                                    "eft"
                                )
                            }
                        >
                            <span>
                                
                            </span>

                            <div>
                                <strong>
                                    EFT
                                </strong>

                                <small>
                                    Electronic
                                    transfer
                                </small>
                            </div>
                        </button>

                        <button
                            type="button"
                            className={
                                paymentMethod === "cash"
                                    ? "method active"
                                    : "method"
                            }
                            onClick={() =>
                                setPaymentMethod(
                                    "cash"
                                )
                            }
                        >
                            <span>
                                
                            </span>

                            <div>
                                <strong>
                                    Pay at Pickup
                                </strong>

                                <small>
                                    Pay when collecting
                                </small>
                            </div>
                        </button>

                    </div>

                    {paymentMethod ===
                        "card" && (

                        <div className="card-form">

                            <h3> Card Details </h3>

                            <label>
                                Cardholder Name
                            </label>

                            <input
                                type="text"
                                name="cardName"
                                placeholder="Name on card"
                                value={
                                    cardData.cardName
                                }
                                onChange={
                                    handleCardChange
                                }
                                required
                            />

                            <label>
                                Card Number
                            </label>

                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={
                                    cardData.cardNumber
                                }
                                onChange={
                                    handleCardNumberChange
                                }
                                maxLength="19"
                                inputMode="numeric"
                                required
                            />

                            <div className="card-row">

                                <div>

                                    <label>
                                        Expiry Date
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={
                                            cardData.expiry
                                        }
                                        onChange={
                                            handleExpiryChange
                                        }
                                        maxLength="5"
                                        required
                                    />

                                </div>

                                <div>

                                    <label>
                                        CVV
                                    </label>

                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="123"
                                        value={
                                            cardData.cvv
                                        }
                                        onChange={
                                            (e) =>
                                                setCardData({
                                                    ...cardData,
                                                    cvv: e.target.value
                                                        .replace(
                                                            /\D/g,
                                                            ""
                                                        )
                                                        .slice(
                                                            0,
                                                            3
                                                        )
                                                })
                                        }
                                        maxLength="3"
                                        inputMode="numeric"
                                        required
                                    />

                                </div>

                            </div>

                            <p className="secure-text">
                                Your payment information is securely processed.
                            </p>

                        </div>
                    )}


                    {paymentMethod ===
                        "eft" && (

                        <div className="payment-info">

                            <h3>
                                EFT Payment
                            </h3>

                            <p>
                                After confirming,
                                you will receive
                                the banking details
                                needed to complete
                                your payment.
                            </p>

                        </div>
                    )}


                    {paymentMethod ===
                        "cash" && (

                        <div className="payment-info">

                            <h3>
                                Pay at Pickup
                            </h3>

                            <p>
                                You can pay the full rental amount when collecting
                                the vehicle.
                            </p>

                        </div>
                    )}

                    <button
                        className="pay-button"
                        onClick={
                            handleSubmit
                        }
                        disabled={
                            loading ||
                            hours <= 0
                        }
                    >
                        {loading
                            ? "Processing..."
                            : `Pay R${totalAmount.toLocaleString(
                                "en-ZA"
                            )}`}
                    </button>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() =>
                            navigate(
                                `/cars/${id}`
                            )
                        }
                    >
                        Back to Car
                    </button>

                </div>

                {/* RIGHT SIDE */}

                <div className="order-summary">

                    <h2>
                        Rental Summary
                    </h2>

                    {car?.image && (
                        <img
                            src={car.image}
                            alt={car.name}
                        />
                    )}

                    <h3>
                        {car?.name ||
                            "Rental Car"}
                    </h3>

                    <div className="summary-line">

                        <span>
                            Start
                        </span>

                        <strong>
                            {formatDate(
                                booking?.startDate
                            )}
                        </strong>

                    </div>

                    <div className="summary-line">

                        <span>
                            End
                        </span>

                        <strong>
                            {formatDate(
                                booking?.endDate
                            )}
                        </strong>

                    </div>

                    <div className="summary-line">

                        <span>
                            Rental
                        </span>

                        <strong>
                            {hours}{" "}
                            {hours === 1
                                ? "hour"
                                : "hours"}
                        </strong>

                    </div>

                    <div className="summary-line">

                        <span>
                            Rate
                        </span>

                        <strong>
                            R{RATE_PER_HOUR}
                            /hour
                        </strong>

                    </div>

                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            R
                            {totalAmount.toLocaleString(
                                "en-ZA"
                            )}
                        </strong>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Payment;