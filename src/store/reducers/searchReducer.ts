import {ISearchingState, TSearchingActions} from "../../types/types";
import {FETCH_ERROR, FETCH_SUCCESS, FETCHING, SET_SEARCHING_TYPE, SET_SEARCHING_YEAR} from "../actions/constants";


const initialState: ISearchingState = {
    year: new Date().getFullYear(),
    type: 'movie'
}

const searchReducer = (state = initialState, action: TSearchingActions) => {
    switch (action.type) {
        case SET_SEARCHING_YEAR:
            return {
                ...state,
                year: action.payload
            };
        case SET_SEARCHING_TYPE:
            return {
                ...state,
                type: action.payload
            };
        default:
            return state
    }
}

export default searchReducer