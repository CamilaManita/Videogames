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
        case GET_DETAIL:
            return { ...state, videogameDetail: action.payload}        
        
        case GET_NAME:
            return { ...state, videogames: [action.payload]}

        case GET_GENRES:
            return { ...state, videogamesGenres: action.payload}
        
        case POST_VIDEOGAME: 
            return { ...state }

        case CLEAN_DETAIL: 
            return {
                ...state,
                videogameDetail: {}
            }

        case ORDER:
            const gamesOrdered = [...state.videogames];

            return {
                ...state,
                videogames:
                    action.payload === 'Ascendant'
                        ? gamesOrdered.sort((a, b) => a.id - b.id)
                        : gamesOrdered.sort((a, b) => b.id - a.id)
            }

        default:
            return { ...state};
    }
}

export default reducer;