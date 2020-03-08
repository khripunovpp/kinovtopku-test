import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IFilm, TFilmsActions, TLocalStorage} from "../../../types/types";
import FILMSAPI from "../../../configs/API";
import {fetchError, fetchSuccess, setFetchingStatus} from "../creators/filmsActions";
import {FETCH_FILMS_EXPIRE} from "../../../configs/globalConstants";
import {prepareFilmData} from "../../../utils/filmsUtils";

const fetchFilms = (type: string, year: number): ThunkAction<void, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>) => {
        dispatch(setFetchingStatus())

        let isCashed = false

        const localStorageString = localStorage.getItem('films')

        if (localStorageString) {
            const localStorageFilms: TLocalStorage = await JSON.parse(localStorage.getItem('films') || '')

            // проверяем, если прошло меньше времени чем указано в fetchFilmsExpire и параметры поиска
            // совпадают с предыдущими, тогда берем данные из localStorage
            // иначе делаем новый запрос и обновляем данные
            if (Date.now() - localStorageFilms.updatedAt < FETCH_FILMS_EXPIRE
                    && type === localStorageFilms.searchParams.type
                    && year === localStorageFilms.searchParams.year) {
                isCashed = true
                dispatch(fetchSuccess(localStorageFilms.data, localStorageFilms.updatedAt))
            }
        }

        if (!isCashed) request(dispatch, type, year)
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
            return prepareFilmData(type, film)
        })

        dispatch(fetchSuccess(results))

        // сохраням данные в localStorage с метой времени
        const storageFilms: TLocalStorage = {
            searchParams: {year, type},
            data: results,
            updatedAt: Date.now()
        }

        localStorage.setItem('films', JSON.stringify(storageFilms))
    }).catch((error: Error) => {
        dispatch(fetchError(error.message))
    })
}

export default fetchFilms