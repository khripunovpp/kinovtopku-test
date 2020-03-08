import {FETCH_ERROR, FETCH_SUCCESS, FETCHING} from "../store/actions/constants";
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

interface IFilmsActionFetch {
    type: typeof FETCHING
}

interface IFilmsActionFetchSuccess {
    type: typeof FETCH_SUCCESS
    payload: IFilm[]
}

interface IFilmsActionFetchError {
    type: typeof FETCH_ERROR
    payload: string
}

export type TFilmsActions = IFilmsActionFetch | IFilmsActionFetchSuccess | IFilmsActionFetchError

export interface IFilmState {
    loading: boolean
    films: IFilm[]
    errors: string
    updatedAt: Date
}
