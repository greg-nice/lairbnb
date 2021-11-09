import React from 'react';
import { useSelector } from 'react-redux';

function SplashPage() {
    const spots = useSelector(state => state.spots);

    return (
        <>
            <h1>Hello from SplashPage</h1>
            {spots.map(spot => {
                return <div>{spot.name}</div>
            })}
        </>
    )
}

export default SplashPage;