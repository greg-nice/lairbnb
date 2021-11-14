// import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview } from '../../store/reviews';
// import { getReviews } from '../../store/reviews';

const DeleteReviewForm = ({ spot, reviewId, hideForm }) => {
    const review = useSelector(state => state.reviews[reviewId]);
    const dispatch = useDispatch();
    // const history = useHistory();

    const handleDeleteClick = async (e) => {
        e.preventDefault();

        const deletedReview = await dispatch(deleteReview(reviewId));
        if (deletedReview) {
            // dispatch(getReviews(spot.id));
            hideForm();
            // history.push(`/spots/${spot.id}`);
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