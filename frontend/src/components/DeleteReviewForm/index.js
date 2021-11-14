import { useDispatch, useSelector } from 'react-redux';
import { getReviews, deleteReview } from '../../store/reviews';

const DeleteReviewForm = ({ spot, reviewId, hideForm }) => {
    const review = useSelector(state => state.reviews[reviewId]);
    const dispatch = useDispatch();

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        const deletedReview = await dispatch(deleteReview(reviewId));
        if (deletedReview) {
            dispatch(getReviews(spot.id));
            hideForm();
        }
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <div className="delete-form-wrapper">
            <h3>Delete Your Review</h3>
            <div className="delete-form-body">
                <p>Are you sure you want to delete this Review?</p>
                {review && <br></br>}
                {review && <div>{review.review}</div>}
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    );
};

export default DeleteReviewForm;