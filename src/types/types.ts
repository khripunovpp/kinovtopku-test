import {FETCH_ERROR, FETCH_SUCCESS, FETCHING, SET_SEARCHING_TYPE, SET_SEARCHING_YEAR} from "../store/actions/constants";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

export interface IFilm {
    id: number
    name: string
    year: string | number
    poster: string
    description: string
    type: string
}

type TFilmsActionFetch = {
    type: typeof FETCHING
}

type TFilmsActionFetchSuccess = {
    type: typeof FETCH_SUCCESS
    payload: IFilm[]
}

type TFilmsActionFetchError = {
    type: typeof FETCH_ERROR
    payload: string
}

export type TFilmsActions = TFilmsActionFetch | TFilmsActionFetchSuccess | TFilmsActionFetchError

export interface IFilmState {
    loading: boolean
    films: IFilm[]
    errors: string
    updatedAt: Date
}

export type TSetSearchingYearActionType = {
    type: typeof SET_SEARCHING_YEAR
    payload: number
}
export type TSetSearchingTypeActionType = {
    type: typeof SET_SEARCHING_TYPE
    payload: string
}

export type TSearchingActions = TSetSearchingTypeActionType | TSetSearchingYearActionType

export interface ISearchingState {
    year: number
    type: string
}