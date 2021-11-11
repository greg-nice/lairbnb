import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams, useHistory } from 'react-router-dom';

import { loadSpot, updateSpot } from '../../store/spots';
import Footer from '../Footer/index';
import './EditLairFormPage.css'


function EditLairFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    
    const spot = useSelector(state => state.spots[spotId])

    const [isSpotLoaded, setIsSpotLoaded] = useState(false);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(loadSpot(spotId)).then(() => { setIsSpotLoaded(true) });
    }, [dispatch, spotId]);

    useEffect(() => {
        if (isSpotLoaded) {
            setAddress(spot.address);
            setCity(spot.city);
            setState(spot.state);
            setCountry(spot.country);
            setLat(spot.lat);
            setLng(spot.lng);
            setName(spot.name);
            setPrice(spot.price);
        }
    }, [spot, isSpotLoaded]);

    if (!sessionUser) return <Redirect to="/" />

    const onSubmit = async (e) => {
        e.preventDefault();

        if (sessionUser.id === spot.userId) {
            setErrors([]);
            const formInfo = {
                ...spot,
                address,
                city,
                state,
                country,
                lat,
                lng,
                name,
                price
            }

            const updatedSpot = await dispatch(updateSpot(formInfo))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });

            if (updatedSpot) {
                history.push(`/spots/${spotId}`);
            }
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push(`/spots/${spotId}`);
    }

    return (
        <>
            {isSpotLoaded && (
                <div className="edit-form-wrapper">
                    <h1 id="edit-form-header">Edit Lair</h1>
                    <form className="edit-form" onSubmit={onSubmit}>
                        <ul className='form-errors'>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                        <div>
                            <label>Lair Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>State</label>
                            <input
                                type="text"
                                value={state}
                                onChange={e => setState(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Country</label>
                            <input
                                type="text"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Latitude</label>
                            <input
                                type="number"
                                value={lat}
                                onChange={e => setLat(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Longitude</label>
                            <input
                                type="number"
                                value={lng}
                                onChange={e => setLng(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <button>Submit</button>
                        <button type="button" onClick={handleCancelClick}>Cancel</button>
                    </form>
                </div>
            )}
            <Footer />
        </>
    )
}

export default EditLairFormPage;