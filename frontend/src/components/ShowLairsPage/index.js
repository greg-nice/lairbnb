import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadSpots } from '../../store/spots'
import Footer from '../Footer/index'
import './ShowLairsPage.css';

function ShowLairsPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [isSpotsLoaded, setIsSpotsLoaded] = useState(false);
    const spots = useSelector(state => {
        return Object.keys(state.spots).map(spotId => state.spots[spotId]);
    });

    useEffect(() => {
        dispatch(loadSpots()).then(() => {
            setIsSpotsLoaded(true)
        });
    }, [dispatch]);

    return (
        <>
            <main className="spots-main">
                <div className="heading-wrapper">
                    <h1 className='spots-heading'>Stay in a Lair</h1>
                    {sessionUser && <Link to="/spots/new"><button className='create-lair-button'>Create a Lair</button></Link>}
                </div>
                {isSpotsLoaded && spots.map(spot => {
                    return (
                        <div className='lair-div-wrapper' key={spot.id}>
                            <div className="lair-image-wrapper">
                                <Link to={`/spots/${spot.id}`}>
                                    <img className="lair-image" src={spot.url} alt=""></img>
                                </Link>
                            </div>
                            <div className="spot-info-wrapper">
                                <div><h1><Link to={`/spots/${spot.id}`}>{spot.name}</Link></h1></div>
                                <div><span className="price-span">${spot.price}</span> / night</div>
                                <div>{spot.city}, {spot.country}</div>
                            </div>
                        </div>
                    )
                })}
            </main>
            <Footer />
        </>
    )
}

export default ShowLairsPage;