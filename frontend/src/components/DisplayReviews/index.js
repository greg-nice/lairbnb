import React from 'react';
import './DisplayReviews.css';

function DisplayReviews({ reviews, sessionUser, setEditReviewId }) {
    const handleReviewEditClick = (e) => {
        e.preventDefault();

        setEditReviewId();
    }

    const handleReviewDeleteClick = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <div className="spot-detail-header">{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</div>
            <div className='review-wrapper'>
                {reviews.map(review => {
                    return (
                        <div className="review-div" key={review.id}>
                            <img className="profile-pic" src="https://miro.medium.com/max/700/1*ZYpBSAe0dC4_ha-3GhcO9Q.jpeg" alt=""></img>
                            <span className="reviewer-name">{review.User.username}</span> <br />
                            <span className="review-date">{review.createdAt.slice(0, 10).split("-").splice(0,2).reverse().join("/")}</span> <br />
                            {review.review}
                            {sessionUser && sessionUser.id === review.userId && <button onClick={handleReviewEditClick}>Edit</button>}
                            {sessionUser && sessionUser.id === review.userId && <button onClick={handleReviewDeleteClick}>Delete</button>}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DisplayReviews;