import axios from 'axios';
import {
    GET_VIDEOGAMES, GET_DETAIL, CLEAN_DETAIL, GET_GENRES, GET_NAME, POST_VIDEOGAME, FILTER_GENRE, ORDER, CREATE, ORDER_RATING, FILTER_PLATFORMS, EDIT_VIDEOGAME, DELETE_VIDEOGAME
} from './actions_types';

export const getVideogame = () => {
    return async function (dispatch) {
        const { data } = await axios.get('http://localhost:3001/games/');
        dispatch({ type: GET_VIDEOGAMES, payload: data});
    };
};

export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/games/${id}`);
            dispatch({ type: GET_DETAIL, payload: data});
        } catch (error) {
            return [];
        }
    }
}

export const getName = (name) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/games?name=${name}`);
            dispatch({ type: GET_NAME, payload: data});
        } catch (error) {
            const errorData = {
                message: 'Error: Pokemon not found',
                status: error.response ? error.response.status : null
            };
            throw errorData;
        }
    }
}

export const getGenres = () => {
    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3001/genres`);
        dispatch({ type: GET_GENRES, payload: data});
    }
}

export const postVideogame = (newVideogame) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/games/`, newVideogame)
            return dispatch({ type: POST_VIDEOGAME, payload: data});
        } catch (error) {
            return error.message;
        }
    }
}

export const filter = (genre) => {
    return { type: FILTER_GENRE, payload: genre }
}

export const filterPlatforms = (platforms) => {
    return { type: FILTER_PLATFORMS, payload: platforms }
}

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL }
};

export const order = (order) => {
    return { type: ORDER, payload: order}
}

export const orderRating = (order) => {
    return { type: ORDER_RATING, payload: order }
}

export const create = (create) => {
    return { type: CREATE, payload: create }
}

export const updateVideogame = async (id, game) => {
 return async (dispatch) => {
    try {
        const { data } = await axios.put(`http://localhost:3001/games/${id}`, game)

        return dispatch({
            type: EDIT_VIDEOGAME,
            payload: data
        })
    } catch (error) {
        return error.message
    }
 }   
}

export const deleteVideogame = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(`http://localhost:3001/games/${id}`)
            return dispatch({
                type: DELETE_VIDEOGAME,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}