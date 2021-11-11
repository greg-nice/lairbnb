import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { loadSpot } from '../../store/spots'
import Footer from '../Footer/index'
import './ShowOneLairPage.css';

function ShowOneLairPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const { spotId } = useParams();
    const [isSpotLoaded, setIsSpotLoaded] = useState(false);
    const spot = useSelector(state => state.spots[spotId]);

    useEffect(() => {
        dispatch(loadSpot(spotId)).then(() => {setIsSpotLoaded(true)});
    }, [dispatch, spotId]);

    const handleEditClick = (e) => {
        e.preventDefault();

        console.log("hello from editClick handler");

        if (sessionUser.id === spot.userId) {
            history.push(`/spots/${spotId}/edit`);
        }
    }

    const handleDeleteClick = (e) => {
        e.preventDefault();

        console.log("hello from deleteClick handler");

        if (sessionUser.id === spot.userId) {
            history.push(`/spots/${spotId}/delete`);
            // dispatch(removeSpot(spotId));
            // history.push("/");
        }
    }
    
    return (
        <>
            <main className="main-one-spot">
                {isSpotLoaded && (
                <div className="spot-details">
                    <h1>{spot.name}</h1>
                    <div>{spot.address}</div>
                    <div>{`${spot.city}, ${spot.state}`}</div>
                    <div>{spot.country}</div>
                    <div>Latitude: {spot.lat}</div>
                    <div>Longitude: {spot.lng}</div>
                    <div>${spot.price} / night</div>
                    {sessionUser.id === spot.userId && <button onClick={handleEditClick}>Edit</button>}
                    {sessionUser.id === spot.userId && <button onClick={handleDeleteClick}>Delete</button>}
                </div>
                )}
            </main>
            <Footer />
        </>
    )
}

export default ShowOneLairPage;