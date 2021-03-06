import axios from "axios";
import {KEY} from "./movieDbConfig";

const FILMSAPI = {
    getFilms(type: string, params: any) {
        const parameters = Object.keys(params)
            .map(function (key) {
                return key + "=" + params[key];
            })
            .join("&");
        return axios.get(
            `https://api.themoviedb.org/3/discover/${type}?${parameters}&api_key=${KEY}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1`
        )
    },
    find(id: number, type: string) {
        return axios.get(
            `https://api.themoviedb.org/3/${type}/${id}?api_key=${KEY}&language=en-US`
        )
    }
}

export default FILMSAPI