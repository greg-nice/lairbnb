import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signup } from '../../store/session';
import Footer from '../Footer/index';
import './SignupForm.css';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [url, setUrl] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {

            setErrors([]);
            const formInfo = {
                email,
                username,
                password,
                url
            }
            return dispatch(signup(formInfo))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }

        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <>
            <div className="form-wrapper">
                <form className="form-style" onSubmit={onSubmit}>
                    <ul className='form-errors'>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <div>
                        <label className="form-button">
                        Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-button">
                        Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-button">
                        Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-button">
                        Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                    <label className="form-button">
                        Image Url
                        </label>
                        <input
                        type="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        required
                        />
                    </div>
                    <button className="signup-form-button">Sign Up</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default SignupFormPage;