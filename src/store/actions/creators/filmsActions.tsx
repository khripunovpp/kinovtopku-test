import {FETCH_ERROR, FETCH_SUCCESS, FETCHING} from "../constants";
import {IFilm, TFilmsActions} from "../../../types/types";

export const setFetchingStatus = (): TFilmsActions => ({type: FETCHING})
export const fetchSuccess = (films: IFilm[]): TFilmsActions => ({type: FETCH_SUCCESS, payload: films})
export const fetchError = (error: string): TFilmsActions => ({type: FETCH_ERROR, payload: error})