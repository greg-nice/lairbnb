import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../../store/session';
import Footer from '../Footer/index'
import './LoginForm.css';

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        const formInfo = {
            credential,
            password
        }
        return dispatch(loginUser(formInfo))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            })
    };

    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) {
        return (
            <Redirect to="/"/>
        );
    }

    return (
        <>
            <div className="form-wrapper">
                <form className="form-style" onSubmit={onSubmit}>
                    <ul className="form-errors">
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <label className="form-button">
                        Username or Email
                        <input
                            type='text'
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label className="form-button">
                        Password
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button className="login-form-button">Log In</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default LoginFormPage;