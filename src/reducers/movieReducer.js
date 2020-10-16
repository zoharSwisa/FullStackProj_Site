
// action - json
// type - mandatory
// payload - optional
const movieReducer = (state = {movies: [], fileredMovies: [], selectedMovie: {}}, action) =>
{
    switch(action.type)
    {
        case "INIT_ALL_MOVIES":
            return {...state, movies : action.payload}

        case "INIT_FILTERED_MOVIES":
            return {...state, fileredMovies : action.payload}

        case "CHOOSE_MOVIE":
            let movie = state.movies.find(m => m.id == action.payload);
            return {...state, selectedMovie : movie};

        case "UPDATE_MOVIE":
            let movies1 = state.movies.map(m => {
                if (m.id == action.payload.id) {
                    return action.payload;
                }
                
                return m;
            });

            return {...state, movies: movies1, selectedMovie : action.payload, fileredMovies: movies1 };

        case "ADD_MOVIE_SUBSCRIPTIONS":
            let movies4 = state.movies.map(m => {
                if (m.id == action.payload.movieId) {
                    m.subscriptionsWatch.push(action.payload.subscription);
                }
                
                return m;
            });

            return {...state, movies: movies4, fileredMovies: movies4};

        case "DELETE_MOVIE":
            let movies2 = state.movies.filter(u => u.id != action.payload);

            return {...state, movies : movies2, fileredMovies: movies2};

        case "ADD_MOVIE":
            let movies3 = state.movies;
            movies3.push(action.payload);
            return {...state, movies : movies3, fileredMovies: movies3};
            
        default:
            return state
    }
}

export default movieReducer;