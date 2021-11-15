import React from 'react';
import './DisplayReviews.css';

function DisplayReviews({ reviews, sessionUser, setEditReviewId, setDeleteReviewId, setCreateReviewId }) {

    const handleReviewEditClick = (e) => {
        e.preventDefault();

        setEditReviewId(e.target.value);
    }

    const handleReviewDeleteClick = (e) => {
        e.preventDefault();

        setDeleteReviewId(e.target.value);
    }

    const handleCreateReviewClick = (e) => {
        e.preventDefault();

        setCreateReviewId(e.target.value);
    }


    return (
        <div className="spot-reviews-wrapper">
            <div className="spot-detail-header-wrapper">
                <div className="spot-detail-header">{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</div>
                <div>
                    {sessionUser && <button className='create-lair-button' value="true" onClick={handleCreateReviewClick}>Add Review</button>}
                </div>
            </div>
            <div className='review-wrapper'>
                {reviews.map(review => {
                    return (
                        <div className="review-div" key={review.id}>
                                <div className="profile-pic-and-name-date-group">
                                <div className="profile-pic-div">
                                    <img className="profile-pic" src={review.User.url} alt=""></img>
                                </div>
                                <div className="name-date">
                                    <div className="reviewer-name">{review.User.username}</div>
                                    <div className="review-date">{review.createdAt.slice(0, 10).split("-").splice(0, 2).reverse().join("/")}</div>
                                </div>
                            </div>
                            <div className="review-and-edit-delete-buttons">
                                <div className="review-content">{review.review}</div>
                                <div className="edit-delete-buttons-review">
                                    {sessionUser && sessionUser.id === review.userId && <button className='display-review-button' value={review.id} onClick={handleReviewEditClick}>Edit</button>}
                                    {sessionUser && sessionUser.id === review.userId && <button className='display-review-button' value={review.id} onClick={handleReviewDeleteClick}>Delete</button>}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DisplayReviews;