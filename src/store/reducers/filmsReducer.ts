import {IFilm, IFilmState, TFilmsActions} from "../../types/types";
import {FETCH_ERROR, FETCH_SUCCESS, FETCHING} from "../actions/constants";

const films: IFilm[] = []

const initialState: IFilmState = {
    loading: true,
    films: films,
    errors: '',
    updatedAt: new Date()
}

const filmsReducer = (state = initialState, action: TFilmsActions) => {
    switch (action.type) {
        case FETCHING:
            return {
                ...state,
                loading: true,
                updatedAt: new Date()
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                films: [...action.payload],
                updatedAt: new Date()
            };
        case FETCH_ERROR:
            console.log(action.payload)
            return {
                ...state,
                loading: false,
                errors: action.payload,
                updatedAt: new Date()
            };
            ;
        default:
            return state
    }
}

export {
    filmsReducer
}