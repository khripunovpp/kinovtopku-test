import React from "react"
import {IFilm} from "../../types/types"

interface IProps {
    data: IFilm
}

const FilmDescription: React.FC<IProps> = ({data: film}) => {
    return (
        <>
            <h1 className="filmPage__title">{film.name} <span>{film.year}</span></h1>
            <img src={film.poster} alt={film.name}/>
            {film.description && <p>{film.description}</p>}
        </>
    )
}

export default FilmDescription