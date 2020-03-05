import {IFilm, IFilmState, TFilmsActions} from "../../types/types";
import {FETCH_ERROR, FETCH_SUCCESS} from "../actions/constants";

const films: IFilm[] = [
    {
        id: 5,
        name: 'Name',
        description: 'Description',
        year: 2020,
        poster: 'd'
    }
]

const initialState: IFilmState = {
    loading: true,
    films: films,
    errors: '',
    updatedAt: new Date
}

const filmsReducer = (state = initialState, action: TFilmsActions) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                films: [...action.payload]
            };
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
            ;
        default:
            return state
    }
}

export {
    filmsReducer
}