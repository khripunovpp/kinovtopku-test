import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {FETCH_ERROR, FETCH_FILMS, FETCH_SUCCESS} from "./constants";
import {IFilm, TFilmsActions} from "../../types/types";
import API from "../../components/API";

const fetchFilms = (type: string, year: number): ThunkAction<Promise<IFilm[]>, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>): Promise<IFilm[]> => {
        dispatch({
            type: FETCH_FILMS
        })
        return await API.getFilms(`discover/${type}`, {
            [type === 'tv' ? 'first_air_date_year' : 'year']: year
        }).then<any>((response: any) => {
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
        })
    }
}

export default fetchFilms