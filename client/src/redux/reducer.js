import { GET_VIDEOGAMES, GET_DETAIL, CLEAN_DETAIL, GET_GENRES, GET_NAME, POST_VIDEOGAME, FILTER_GENRE, ORDER, CREATE, ORDER_RATING, FILTER_PLATFORMS } from "./actions_types";

const initialState = {
    allVideogames: [],
    videogames: [],
    videogameDetail: {},
    videogamesGenres: [],
    videogamesFiltered: [],
    selectedGenre: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };
    
        default:
            return { ...state};
    }
}

export default reducer;