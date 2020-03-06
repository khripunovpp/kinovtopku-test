import React from "react";
import FilmsItem from "../FilmsItem/FilmsItem";
import {IFilm} from "../../types/types";

import filmItemStyles from '../FilmsItem/FilmsItem.module.scss'

interface props {
    films: IFilm[]
}

const FilmsList = ({films}: props) => {
    return (
        <div className="films">
            {films.map(film => {
                return (
                    <div className={`card films__item ${filmItemStyles.item}`} key={film.id}>
                        <FilmsItem data={film}/>
                    </div>)
            })}

        </div>
    )
}

export default FilmsList