import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Review.css";

function Review() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchReviews();
    }, [id]);

    async function fetchReviews() {
        try {
            setLoading(true);
            setError("");

            const auth = localStorage.getItem("auth");

            if (!auth) {
                throw new Error("Please sign in first.");
            }

            const response = await fetch(
                `http://localhost:3000/reviews/car/${id}`,
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
                    data.error || "Failed to load reviews."
                );
            }

            setReviews(data);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setSubmitting(true);
        setMessage("");
        setError("");

        try {
            const auth = localStorage.getItem("auth");

            if (!auth) {
                throw new Error("Please sign in first.");
            }

            const response = await fetch(
                "http://localhost:3000/reviews",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Basic ${auth}`
                    },
                    body: JSON.stringify({
                        carId: id,
                        rating: Number(rating),
                        comment: comment
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to post review."
                );
            }

            setMessage("Review posted successfully!");

            setRating(5);
            setComment("");

            fetchReviews();

        } catch (err) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    function goBack() {
        navigate("/cars");
    }

    return (
        <div className="review-page">

            <div className="review-container">

                <h1>Car Reviews</h1>

                <p className="review-subtitle">
                    Share your experience with this car
                </p>

                {/* Review Form */}

                <div className="review-form-card">

                    <h2>Write a Review</h2>

                    <form onSubmit={handleSubmit}>

                        <label>Rating</label>

                        <select
                            value={rating}
                            onChange={(e) =>
                                setRating(e.target.value)
                            }
                        >
                            <option value="5">★★★★★ - 5</option>
                            <option value="4">★★★★☆ - 4</option>
                            <option value="3">★★★☆☆ - 3</option>
                            <option value="2">★★☆☆☆ - 2</option>
                            <option value="1">★☆☆☆☆ - 1</option>
                        </select>

                        <label>Comment</label>

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            placeholder="Tell us about your experience..."
                            rows="5"
                        />

                        {error && (
                            <p className="review-error">
                                {error}
                            </p>
                        )}

                        {message && (
                            <p className="review-success">
                                {message}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="submit-review-btn"
                        >
                            {submitting
                                ? "Posting..."
                                : "Post Review"}
                        </button>

                    </form>

                </div>

                {/* Existing Reviews */}

                <div className="existing-reviews">

                    <h2>Customer Reviews</h2>

                    {loading ? (
                        <p>Loading reviews...</p>
                    ) : reviews.length === 0 ? (
                        <p className="no-reviews">
                            No reviews yet.
                        </p>
                    ) : (
                        reviews.map((review) => (

                            <div
                                className="review-card"
                                key={review._id}
                            >

                                <div className="review-header">

                                    <h3>
                                        {review.userName}
                                    </h3>

                                    <span className="rating">
                                        {"★".repeat(review.rating)}
                                        {"☆".repeat(
                                            5 - review.rating
                                        )}
                                    </span>

                                </div>

                                <p className="review-comment">
                                    {review.comment}
                                </p>

                                <small>
                                    {new Date(
                                        review.createdAt
                                    ).toLocaleDateString()}
                                </small>

                            </div>

                        ))
                    )}

                </div>

                <button
                    className="back-btn"
                    onClick={goBack}
                >
                    ← Back to Cars
                </button>

            </div>

        </div>
    );
}

export default Review;