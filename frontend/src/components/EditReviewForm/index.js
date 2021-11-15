import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, updateReview } from '../../store/reviews';
import './EditReviewForm.css';

const EditReviewForm = ({ spot, reviewId, hideForm }) => {
    const review = useSelector(state => state.reviews[reviewId]);
    const dispatch = useDispatch();
    const [reviewContent, setReviewContent] = useState(review.review);
    const [errors, setErrors] = useState([]);
    
    const validate = () => {
        const errors = []
        if (reviewContent.length < 4) errors.push("Review must be at least 4 characters in length.");
        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        const errors = validate();
        setErrors(errors);
        if (errors.length > 0) return;

        const payload = {
            ...review,
            review: reviewContent,
        };

        const updatedReview = await dispatch(updateReview(payload));
        if (updatedReview) {
            await dispatch(getReviews(spot.id));
            hideForm();
            
        }
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <h3>Update Your Review</h3>
                <div>
                    <ul className="form-errors">
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
                <textarea
                    placeholder="Your Review"
                    value={reviewContent}
                    onChange={e => setReviewContent(e.target.value)}
                />
                <br></br>
                <button className="edit-review-form-button" type="submit">Update Review</button>
                <button className="edit-review-form-button" type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
};

export default EditReviewForm;