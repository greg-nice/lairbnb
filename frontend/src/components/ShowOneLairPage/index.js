import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { loadSpot } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import EditReviewForm from '../EditReviewForm';
import Footer from '../Footer/index';
import './ShowOneLairPage.css';

function ShowOneLairPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const [isSpotLoaded, setIsSpotLoaded] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);
    const spot = useSelector(state => state.spots[spotId]);
    const reviews = useSelector(state => {
        return Object.keys(state.reviews).map(reviewId => state.reviews[reviewId])
    });

    useEffect(() => {
        dispatch(loadSpot(spotId)).then(() => {
            setIsSpotLoaded(true);
        });
        dispatch(getReviews(spotId));
        setEditReviewId(null);
    }, [dispatch, spotId]);

    const handleEditClick = (e) => {
        e.preventDefault();

        if (sessionUser.id === spot.userId) {
            history.push(`/spots/${spotId}/edit`);
        }
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();

        if (sessionUser.id === spot.userId) {
            history.push(`/spots/${spotId}/delete`);
            // dispatch(removeSpot(spotId));
            // history.push("/");
        }
    }

    const handleReviewEditClick = (e) => {
        e.preventDefault();

    }

    const handleReviewDeleteClick = (e) => {
        e.preventDefault();

    }

    let content = null

    if (editReviewId) {
        content = (
            <EditReviewForm spot={spot} reviewId={editReviewId} hideForm={() => setEditReviewId(null)}/>
        )
    } else if (isSpotLoaded) {
        content = (
            <>
                <img className="spot-detail-image" src={spot.url} alt=""></img>
                <div className="spot-detail-data">
                    <div>{spot.address}</div>
                    <div>{`${spot.city}, ${spot.state}, ${spot.country}`}</div>
                    {/* <div>Latitude: {spot.lat}</div>
                    <div>Longitude: {spot.lng}</div> */}
                    <div><span className="price-span">${spot.price}</span> / night</div>
                    {sessionUser && sessionUser.id === spot.userId && <button onClick={handleEditClick}>Edit</button>}
                    {sessionUser && sessionUser.id === spot.userId && <button onClick={handleDeleteClick}>Delete</button>}
                </div>
                <div>
                    {reviews && <h4>{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</h4>}
                    {reviews.map(review => {
                        return (
                            <div className="review-div" key={review.id}>
                                {review.User.username} <br />
                                {review.createdAt.slice(0,10)} <br />
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
    
    return (
        <>
            <main className="main-one-spot">
                {isSpotLoaded && (
                <div className="spot-details">
                    <h1>{spot.name}</h1>
                    {content}
                </div>
                )}
            </main>
            <Footer />
        </>
    )
}

// https://i.guim.co.uk/img/media/ea3b0d576028663ce489ca63e61ffde45bbe2631/0_181_2142_1285/master/2142.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=82fc39e770f2a9ca8f1547d0900cef4d

export default ShowOneLairPage;