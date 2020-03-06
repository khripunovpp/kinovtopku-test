import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {IFilm} from "../../types/types";

interface props {
    ID: string
    TYPE: string
}

const FilmPage = ({ID, TYPE}: props) => {

    const data = useSelector((state: RootState)=>{
        const result = state.filmsState.films.filter(film => film.id == Number(ID))
        return result.length>0 && result[0]
    })

    return (
        <div className="filmPage">
            <h1 className="filmPage__title">{name}</h1>
        </div>
    )
}

export default FilmPage