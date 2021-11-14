import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'

const load = (reviews, spotId) => ({
    type: LOAD_REVIEWS,
    reviews,
    spotId
})

const update = (review) => ({
    type: UPDATE_REVIEW,
    review,
})

const add = (review) => ({
    type: ADD_REVIEW,
    review
})

const remove = (reviewId, spotId) => ({
    type: REMOVE_REVIEW,
    reviewId,
    spotId
})

export const getReviews = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews, id));
    }
} 

export const createReview = (data, spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(add(review));
        return review;
    }
}

export const updateReview = (data) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });

    const review = await response.json();
    dispatch(update(review));
    return review;
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        const review = await response.json();
        dispatch(remove(review.id, review.spotId));
        return review;
    }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newReviews = {};
            action.reviews.forEach(review => {
                newReviews[review.id] = review
            });
            return {
                ...newReviews
            };
        case REMOVE_REVIEW:
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        case ADD_REVIEW:
        case UPDATE_REVIEW:
            return {
                ...state,
                [action.review.id]: action.review
            };
        default:
            return state;
    } 
}

export default reviewsReducer;