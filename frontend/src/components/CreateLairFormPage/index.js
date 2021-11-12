import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

import { createSpot } from '../../store/spots';
import Footer from '../Footer/index';
import './CreateLairFormPage.css';

function CreateLairFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return <Redirect to="/" />

    const onSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);
        const formInfo = {
            userId: sessionUser.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            price,
            url
        }

        const spot = await dispatch(createSpot(formInfo))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });

        if (spot) {
            history.push(`/spots/`);
            return;
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push("/spots");
    }

    return (
        <>
            <div className='form-wrapper'>
                <h1 className='create-form-h1'>Create Lair</h1>
                <form className='form-style' onSubmit={onSubmit}>
                    <ul className='form-errors'>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <div className='create-form-div'>
                        <label className="form-label">Lair Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='create-form-div'>
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className='create-form-div'>
                        <label className="form-label">City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                    </div>
                    <div className='create-form-div'>
                        <label className="form-label">State</label>
                        <input
                            type="text"
                            value={state}
                            onChange={e => setState(e.target.value)}
                            required
                        />
                    </div>
                    <div className='create-form-div'>
                        <label className="form-label">Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            required
                        />
                    </div>
                    <div className='create-form-div'>
                        <label className="form-label">Latitude</label>
                        <input
                            type="number"
                            value={lat}
                            onChange={e => setLat(e.target.value)}
                            required
                        />
                    </div>
                    <div className='create-form-div'>
                        <label className="form-label">Longitude</label>
                        <input
                            type="number"
                            value={lng}
                            onChange={e => setLng(e.target.value)}
                            required
                        />
                    </div>
                    <div className='create-form-div'>
                        <label className="form-label">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Image Url</label>
                        <input
                            type="url"
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button className="create-form-button">Submit Lair</button>
                    <button className="create-form-button" type="button" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CreateLairFormPage;