import { csrfFetch } from './csrf';

const LOGIN = 'session/LOGIN';
const LOGOUT = 'session/LOGOUT';

const login = user => ({
    type: LOGIN,
    user,
});

const logout = () => ({
    type: LOGOUT
});

export const loginUser = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });

    const data = await response.json();
    dispatch(login(data.user));
    return response;
}

export const logoutUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/', {
        method: "DELETE"
    })
    
    dispatch(logout());
    return response;
}

export const loginDemo = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/demo', {
        method: "POST"
    })

    const data = await response.json();
    dispatch(login(data.user));
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session/');
    const data = await response.json();
    if (data.user) {
        dispatch(login(data.user));
    }
    return response;
}

export const signup = (user) => async (dispatch) => {
    const { username, email, password } = user;
    const response = await csrfFetch('/api/users', {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    const data = await response.json();
    dispatch(login(data.user));
    return response;
}

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                user: {...action.user}
            };
        case LOGOUT:
            return {
                user: null
            };
        default:
            return state;
    }
}

export default sessionReducer;