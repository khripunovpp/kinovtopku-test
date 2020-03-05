import React from "react";
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {FETCH_FILMS} from "./constants";
import axios from 'axios';
import {IFilm, TFilmsActions} from "../../types/types";

const fetchFilms = (): ThunkAction<Promise<IFilm[]>, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>): Promise<IFilm[]> => {
        dispatch({
            type: FETCH_FILMS
        })
        await axios.get<IFilm[]>(
            'https://api.themoviedb.org/3/discover/movie?api_key=5a9cdecd90d6308c3c91a6bef6eaf952&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2020'
        ).then(response => {
            console.log(response)
            return response;
        }).then(films => {
            console.log(films)
        })
        return [
            {
                id: 5,
                name: 'Name',
                description: 'Description',
                year: 2020,
                poster: 'd'
            }
        ]
    }
}

export default fetchFilms