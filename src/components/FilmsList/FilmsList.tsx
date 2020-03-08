import React from "react";
import FilmsItem from "../FilmsItem/FilmsItem";
import {IFilm} from "../../types/types";

import filmItemStyles from '../FilmsItem/FilmsItem.module.scss'

interface IProps {
    films: IFilm[]
    updatedAt: number
}

const FilmsList: React.FC<IProps> = ({films, updatedAt}) => {
    const lastUpdate = new Date(updatedAt).toString()
    return (
        <div className="films">
            Обновление коллекции: {lastUpdate}
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