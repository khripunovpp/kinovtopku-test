import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IFilm, TFilmsActions, TLocalStorage} from "../../../types/types";
import FILMSAPI from "../../../API";
import {fetchError, fetchSuccess, setFetchingStatus} from "../creators/filmsActions";
import {fetchFilmsExpire} from "../../../globalConstants";

const fetchFilms = (type: string, year: number): ThunkAction<void, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>) => {
        dispatch(setFetchingStatus())

        let isCashed = false

        const localStorageString = localStorage.getItem('films')

        if (localStorageString) {
            const localStorageFilms: TLocalStorage = await JSON.parse(localStorage.getItem('films') || '')

            // проверяем, если прошло больше времени чем указано в fetchFilmsExpire, тогда делаем новый запрос и обновляем данные
            // иначе берем данные из localStorage
            if (Date.now() - localStorageFilms.updatedAt < fetchFilmsExpire) {
                isCashed = true
                dispatch(fetchSuccess(localStorageFilms.data))
            }
        }

        if(!isCashed) request(dispatch, type, year)
    }
}

const request = async (dispatch: Function, type: string, year: number) => {
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

        // сохраням данные в localStorage с метой времени
        const storageFilms: TLocalStorage = {
            data: results,
            updatedAt: Date.now()
        }

        localStorage.setItem('films', JSON.stringify(storageFilms))
    }).catch((error: Error) => {
        dispatch(fetchError(error.message))
    })
}

export default fetchFilms