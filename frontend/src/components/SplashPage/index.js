// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// import { loadSpots } from '../../store/spots'
import Footer from '../Footer/index'
import './SplashPage.css';

function SplashPage() {
    // const dispatch = useDispatch();
    // const [isSpotsLoaded, setIsSpotsLoaded] = useState(false);
    // const sessionUser = useSelector(state => state.session.user);
    // const spots = useSelector(state => {
    //     return Object.keys(state.spots).map(spotId => state.spots[spotId]);
    // });
    
    // useEffect(() => {
    //     dispatch(loadSpots()).then(() => {
    //         setIsSpotsLoaded(true)});
    // }, [dispatch]);

    return (
        <>  
            <main className="splash-main">
                <div className="splash-link-wrapper">
                    <Link id="spots-link-img" to="/spots">
                        <img id="splash-image" src="https://cdn3.whatculture.com/images/2019/01/31939a851d996d1c-600x338.jpg" alt=""></img>
                    </Link>
                    <Link id="spots-link">Stay in a Lair</Link>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default SplashPage;