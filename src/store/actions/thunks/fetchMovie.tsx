import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IFilm, TFilmsActions, TLocalStorage} from "../../../types/types";
import FILMSAPI from "../../../configs/API";
import {setFetchingStatus} from "../creators/filmsActions";
import {FETCH_FILMS_EXPIRE} from "../../../configs/globalConstants";
import {prepareFilmData} from "../../../utils/filmsUtils";

const fetchMovie = (id: number, type: string): ThunkAction<Promise<any>, {}, {}, TFilmsActions> => {
    return async (dispatch: ThunkDispatch<{}, {}, TFilmsActions>): Promise<any> => {
        dispatch(setFetchingStatus())

        let isCashed = false

        const localStorageString = localStorage.getItem('films')

        if (localStorageString) {
            const localStorageFilmsData: TLocalStorage = await JSON.parse(localStorage.getItem('films') || '')
            const localStorageFilms: IFilm[] = localStorageFilmsData.data

            const resultsInLocalStorage = localStorageFilms.filter(film => film.id === id)

            console.log(resultsInLocalStorage[0])

            // проверяем, если прошло меньше времени чем указано в fetchFilmsExpire и фильм найен в localStorage,
            // то берем его оттудаб иначе делаем новый запрос и обновляем данные
            if (Date.now() - localStorageFilmsData.updatedAt < FETCH_FILMS_EXPIRE
                && resultsInLocalStorage.length > 0) {
                isCashed = true
                return Promise.resolve(resultsInLocalStorage[0])
            }
        }

        if (!isCashed) return await request(dispatch, id, type)
    }
}

const request = async (dispatch: Function, id: number, type: string) => {
    return await FILMSAPI.find(
        id, type
    ).then((response: any) => {
        if (response.status === 200) {
            return response.data
        } else throw new Error('error')
    }).then((film: any) => {
        return prepareFilmData(type, film)
    })
}

export default fetchMovie