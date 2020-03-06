import axios from "axios";
import {KEY} from "./configs/movieDbConfig";

const API = {
    getFilms(endpoint: string, params: any) {
        const parameters = Object.keys(params)
            .map(function (key) {
                return key + "=" + params[key];
            })
            .join("&");
        return axios.get<any>(
            `https://api.themoviedb.org/3/${endpoint}?${parameters}&api_key=${KEY}&language=en-US&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1`
        )
    }
}

export default API