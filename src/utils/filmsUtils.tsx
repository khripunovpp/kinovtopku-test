import {IFilm} from "../types/types";

export const prepareFilmData = (type: string, film: any): IFilm => {
    const yearField = film['first_air_date'] || film['release_date']
    const year = new Date(yearField).getFullYear() || '????'
    const name = film['title'] || film['name']
    const description = film.overview || ''
    const poster = film['poster_path'] ? 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + film['poster_path'] : 'https://via.placeholder.com/500x500'

    const filmObj: IFilm = {
        id: film.id, type, name, description, year, poster
    }

    return filmObj
}