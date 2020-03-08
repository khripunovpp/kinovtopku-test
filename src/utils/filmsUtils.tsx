import {IFilm} from "../types/types";
import {FETCH_FILMS_PLACEHOLDER_URL, FILMS_POSTERS_ENDPOINT_URL} from "../configs/globalConstants";

export const prepareFilmData = (type: string, film: any): IFilm => {
    const yearField = film['first_air_date'] || film['release_date']
    const year = new Date(yearField).getFullYear() || '????'
    const name = film['title'] || film['name']
    const description = film.overview || 'Описание отсутствует'
    const poster = film['poster_path'] ? FILMS_POSTERS_ENDPOINT_URL + film['poster_path'] : FETCH_FILMS_PLACEHOLDER_URL

    const filmObj: IFilm = {
        id: film.id, type, name, description, year, poster
    }

    return filmObj
}