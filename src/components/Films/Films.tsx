import React, {useEffect, useState, useCallback} from "react";
import FilmsList from "../FilmsList/FilmsList";
import Spinner from "../Spinner/Spinner";
import Alert from "../Alert/Alert";
import {IFilm} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store";
import {getFilms} from "../../store/selectors";
import fetchFilms from "../../store/actions/fetchFilms";

export default function () {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [films, setFilms] = useState<IFilm[]>([]);

    const state = useSelector((state: RootState)=>({
        films: getFilms(state)
    }))

    const dispatch: AppDispatch = useDispatch();

    console.log(state)

    useEffect(() => {
        console.log('fetching');
        setLoading(false);
    }, [])

    useEffect(() => {
        setFilms(state.films);
    }, [state.films])

    return (
        <div className="films">
            <div className="films__inner">
                <h1 className='films__title'>Топ-10 низкорейтинговых фильмов</h1>
            </div>
            {loading && <Spinner/>}
            {error && <Alert type={'danger'}>{error}</Alert>}
            {films.length > 0 ? <FilmsList films={films}/> : <Alert>Фильмов не найдено</Alert>}
        </div>
    )
}