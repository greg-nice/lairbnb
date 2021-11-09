import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadSpots } from '../../store/spots'
import Footer from '../Footer/index'

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
            <div>
                <h1>Hello from SplashPage</h1>
                {isSpotsLoaded && spots.map(spot => {
                    return <div key={spot.id}>{spot.name}</div>
                })}
            </div>
            <Footer />
        </>
    )
}

export default SplashPage;