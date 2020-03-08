import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IFilm, TFilmsActions} from "../../types/types";
import FILMSAPI from "../../API";
import {FETCHING} from "./constants";

const fetchMovie = (id: number, type: string): ThunkAction<Promise<IFilm>, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>): Promise<IFilm> => {
        dispatch({
            type: FETCHING
        })
        return await FILMSAPI.find(id, type).then<any>((response: any) => {
            if (response.status === 200) {
                return response.data
            } else throw new Error('error')
        }).then((film: any) => {
            const releaseYear: string = film['release_date'] || film['first_air_date'];

            const movieResult: IFilm = {
                id: film.id,
                type,
                name: film.title || film.name,
                description: film.overview,
                year: new Date(releaseYear).getFullYear() || '????',
                poster: film['poster_path'] ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + film['poster_path'] : 'https://via.placeholder.com/500x500'
            }
            return movieResult
        })

    }
}

export default fetchMovie