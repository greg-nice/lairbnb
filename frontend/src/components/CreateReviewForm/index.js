import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, getReviews } from '../../store/reviews';
import './CreateReviewForm.css';

const CreateReviewForm = ({ spot, hideForm }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)

    const [reviewContent, setReviewContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            userId: sessionUser.id,
            review: reviewContent,
        };

        console.log(payload);
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