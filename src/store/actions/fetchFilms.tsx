import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {FETCHING, FETCH_SUCCESS, FETCH_ERROR} from "./constants";
import {IFilm, TFilmsActions} from "../../types/types";
import FILMSAPI from "./../../API";

const fetchFilms = (type: string, year: number): ThunkAction<Promise<IFilm[] | void>, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>): Promise<IFilm[] | void> => {
        dispatch({
            type: FETCHING
        })
        return await FILMSAPI.getFilms(`discover/${type}`, {
            [type === 'tv' ? 'first_air_date_year' : 'year']: year
        }).then((response: any) => {
            if (response.status === 200) {
                return response.data
            } else throw new Error('error')
        }).then((data: any) => {
            const results: IFilm[] = data.results.filter((_: any, i: number) => i < 10).map((film: any) => {
                const releaseYear = film['release_date'] || film['first_air_date'];
                return {
                    id: film.id,
                    type,
                    name: film.title || film.name,
                    description: film.overview,
                    year: new Date(releaseYear).getFullYear() || '????',
                    poster: film['poster_path'] ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + film['poster_path'] : 'https://via.placeholder.com/500x500'
                }
            })
            dispatch({
                type: FETCH_SUCCESS,
                payload: results
            })
            return results;
        }).catch((error: Error) => {
            dispatch({
                type: FETCH_ERROR,
                payload: error.message
            })
        })
    }
}

export default fetchFilms