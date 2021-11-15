import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviews } from '../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = ({ spot, hideForm }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [reviewContent, setReviewContent] = useState("");
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
            userId: sessionUser.id,
            review: reviewContent,
        };

        const review = await dispatch(createReview(payload, spot.id));
        if (review) {
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
                <h3>Create Your Review</h3>
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
                <button className="create-review-form-button" type="submit">Add Review</button>
                <button className="create-review-form-button" type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
};

export default CreateReviewForm;