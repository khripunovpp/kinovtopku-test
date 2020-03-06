import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {ReduxDispatch} from "../../store/store";
import fetchMovie from "../../store/actions/fetchMovie";
import Spinner from "../Spinner/Spinner";
import {IFilm} from "../../types/types";

interface props {
    id: string
    type: string
}

const FilmPage = ({id, type}: props) => {

    const [loading, setLoading] = useState(true);
    const [film, setFilm] = useState<IFilm | null>(null);

    const dispatch = useDispatch<ReduxDispatch>();

    useEffect(() => {
        dispatch(fetchMovie(Number(id), type)).then(film => {
            setFilm(film);
            setLoading(false);
        })
    }, [])

    return (
        <div className="filmPage">
            <div className="container">
                {loading && <Spinner/>}
                {film && <>
                    <h1 className="filmPage__title">{film.name} <span>{film.year}</span></h1>
                    <img src={film.poster} alt={film.name}/>
                    {film.description && <p>{film.description}</p>}
                </>}
            </div>
        </div>
    )
}

export default FilmPage