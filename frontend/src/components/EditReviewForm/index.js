import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateReview } from '../../store/reviews';

const EditReviewForm = ({ reviewId, hideForm}) => {
    const review = useSelector(state => state.reviews[reviewId]);
    const dispatch = useDispatch();

    const [reviewContent, setReviewContent] = useState(review.review);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...review,
            reviewContent,
        };

        const updatedReview = await dispatch(updateReview(payload));
        if (updatedReview) {
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
                <input
                    type="test"
                    placeholder="Your Review"
                    value={reviewContent}
                    onChange={e => setReviewContent(e.target.value)}
                />
                <button type="submit">Update Review</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
};

export default EditReviewForm;