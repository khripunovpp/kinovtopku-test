import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {IFilm, TFilmsActions, TLocalStorage} from "../../../types/types";
import FILMSAPI from "../../../configs/API";
import {setFetchingStatus} from "../creators/filmsActions";
import {fetchFilmsExpire} from "../../../configs/globalConstants";

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
            if (Date.now() - localStorageFilmsData.updatedAt < fetchFilmsExpire
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
}

export default fetchMovie