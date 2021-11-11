import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadSpots } from '../../store/spots'
import Footer from '../Footer/index'
import './SplashPage.css';

function SplashPage() {
    const dispatch = useDispatch();
    const [isSpotsLoaded, setIsSpotsLoaded] = useState(false);
    const spots = useSelector(state => {
        return Object.keys(state.spots).map(spotId => state.spots[spotId]);
    });
    
    useEffect(() => {
        dispatch(loadSpots()).then(() => {
            setIsSpotsLoaded(true)});
    }, [dispatch]);


    // const spotsObj = useSelector(state => state.spots)

    return (
        <>
            <main className="splash-main">
                <h1>Stays in Lairs around the World</h1>
                {isSpotsLoaded && spots.map(spot => {
                    return (
                    <div key={spot.id}>
                            <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
                            <div>${spot.price} / night</div>
                            <div>{spot.city}, {spot.country}</div>
                            <br></br>
                    </div>
                    )
                })}
            </main>
            <Footer />
        </>
    )
}

export default SplashPage;