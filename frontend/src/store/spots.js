import { csrfFetch } from './csrf';

const LOAD_SPOTS = 'spots/loadSpots'
const ADD_SPOT = 'spots/addSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const UPDATE_SPOT = 'spots/updateSpot'

const load = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const addSpot = (spot) => ({
    type: ADD_SPOT,
    spot
});

const update = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
});

export const loadSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    const spots = await response.json();
    dispatch(load(spots));
    return response;
}

export const loadSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    const spot = await response.json();
    dispatch(addSpot(spot));
}

export const createSpot = (data) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(data)
    });

    const spot = await response.json();
    dispatch(addSpot(spot));
    return spot;
}

export const updateSpot = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });

    const spot = await response.json();
    dispatch(update(spot));
    return spot;
}

export const removeSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteSpot(spotId));
    }
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_SPOT:
            newState = { ...state, [action.spot.id]: action.spot };
            return newState;
        case LOAD_SPOTS:
            const allSpots = {}
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot;
            })
            return { ...allSpots };
        case UPDATE_SPOT:
            return { ...state, [action.spot.id]: action.spot }
        case DELETE_SPOT:
            newState = { ...state };
            delete newState[action.spotId];
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;