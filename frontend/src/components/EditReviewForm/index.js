import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, updateReview } from '../../store/reviews';

const EditReviewForm = ({ spot, reviewId, hideForm }) => {
    const review = useSelector(state => state.reviews[reviewId]);
    const dispatch = useDispatch();

    const [reviewContent, setReviewContent] = useState(review.review);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

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
                <textarea
                    placeholder="Your Review"
                    value={reviewContent}
                    onChange={e => setReviewContent(e.target.value)}
                />
                <br></br>
                <button type="submit">Update Review</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
};

export default EditReviewForm;