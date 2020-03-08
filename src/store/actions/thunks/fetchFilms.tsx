import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IFilm, TFilmsActions} from "../../../types/types";
import FILMSAPI from "../../../API";
import {fetchError, fetchSuccess, setFetchingStatus} from "../creators/filmsActions";

const fetchFilms = (type: string, year: number): ThunkAction<void, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>) => {
        dispatch(setFetchingStatus())

        await FILMSAPI.getFilms(type, {
            [type === 'tv' ? 'first_air_date_year' : 'year']: year
        }).then((response: any) => {
            if (response.status === 200) {
                return response.data
            } else throw new Error('error')
        }).then((data: any) => {
            const results: IFilm[] = data.results.splice(0, 10).map((film: any) => {
                const yearField = film['first_air_date'] || film['release_date']
                const year = new Date(yearField).getFullYear() || '????'
                const name = film['title'] || film['name']
                const description = film.overview || ''
                const poster = film['poster_path'] ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + film['poster_path'] : 'https://via.placeholder.com/500x500'
               
                const filmObj: IFilm = {
                    id: film.id, type, name, description, year, poster
                }
                return filmObj
            })

            dispatch(fetchSuccess(results))
        }).catch((error: Error) => {
            dispatch(fetchError(error.message))
        })
    }
}

export default fetchFilms