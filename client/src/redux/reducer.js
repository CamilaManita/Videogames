import { GET_VIDEOGAMES, GET_DETAIL, CLEAN_DETAIL, GET_GENRES, GET_NAME, POST_VIDEOGAME, FILTER_GENRE, ORDER, CREATE, ORDER_RATING, FILTER_PLATFORMS, EDIT_VIDEOGAME, DELETE_VIDEOGAME } from "./actions_types";

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
                ...state, videogames:
                    action.payload === 'Ascendant'
                        ? gamesOrdered.sort((a, b) => a.id - b.id)
                        : gamesOrdered.sort((a, b) => b.id - a.id)
            }

        case ORDER_RATING:
            const gamesOrderedRate = [...state.videogames];

            return {
                ...state, videogames: 
                    action.payload === 'Worst-rating'
                        ? gamesOrderedRate.sort((a, b) => a.rating - b.rating)
                        : gamesOrderedRate.sort((a, b) => b.rating - a.rating)
            }

        case CREATE: 
            const videogameCreated = state.allVideogames;
            const videogameFilter = action.payload === 'Creado'
                ? videogameCreated.filter((game) => game.createdInDB)
                : videogameCreated.filter((game) => !game.createdInDB)
            
            return {
                ...state, videogames:
                    action.payload === 'All'
                    ? videogameCreated
                    : videogameFilter.length
                    ? videogameFilter
                    : []
            }

        case FILTER_GENRE:
            const games = [...state.allVideogames];

            if (action.payload === 'All genres') {
                return {
                    ...state, 
                    videogames: state.allVideogames
                }
            }

            return {
                ...state,
                videogames: games.filter((el) => el.genres.includes(action.payload))
            };

        case FILTER_PLATFORMS:
            const gamesPlatforms = [...state.allVideogames];

            if (action.payload === 'All plarforms') {
                return {
                    ...state,
                    videogames: state.allVideogames
                }
            }
            return {
                ...state,
                videogames: gamesPlatforms.filter((el) => el.platforms.includes(action.payload))
            }

        case DELETE_VIDEOGAME:
            return {
                ...state,
                videogames: action.payload
            }

        default:
            return { ...state};
    }
}

export default reducer;