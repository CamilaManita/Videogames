import axios from 'axios';
import {
    GET_VIDEOGAMES, GET_DETAIL, CLEAN_DETAIL, GET_TYPES, GET_NAME, POST_VIDEOGAME, FILTER_TYPE, ORDER, CREATE
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

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL }
};

export const order = (order) => {
    return { type: ORDER, payload: order}
}

export const create = (create) => {
    return { type: CREATE, payload: create }
}