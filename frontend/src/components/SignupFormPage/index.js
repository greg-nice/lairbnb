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
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const onSubmit = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {

            setErrors([]);
            const formInfo = {
                email,
                username,
                password
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
                    <ul className='form-errers'>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <label className="form-button">
                        Username
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </label>
                    <label className="form-button">
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label className="form-button">
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label className="form-button">
                        Confirm Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>

                    <button className="form-button">Sign Up</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default SignupFormPage;