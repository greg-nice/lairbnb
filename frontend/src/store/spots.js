import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots'

const load = () => ({
    type: LOAD_SPOTS
});

export const loadSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    const data = await response.json();
    dispatch(load(data.spots));
    return response;
}

const initialState = null

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = {}
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;