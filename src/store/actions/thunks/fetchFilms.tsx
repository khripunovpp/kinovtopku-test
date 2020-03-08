import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IFilm, TFilmsActions} from "../../../types/types";
import FILMSAPI from "../../../API";
import {fetchError, fetchSuccess, setFetchingStatus} from "../creators/filmsActions";

const fetchFilms = (type: string, year: number): ThunkAction<Promise<IFilm[] | void>, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>): Promise<IFilm[] | void> => {
        dispatch(setFetchingStatus())

        return await FILMSAPI.getFilms(type, {
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

            dispatch(fetchSuccess(results))

            return results;
        }).catch((error: Error) => {
            dispatch(fetchError(error.message))
        })
    }
}

export default fetchFilms