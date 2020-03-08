import React, {useEffect, useState} from "react";
import FilmsList from "../FilmsList/FilmsList";
import Spinner from "../Spinner/Spinner";
import Alert from "../Alert/Alert";
import {IFilm} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {ReduxDispatch, RootState} from "../../store/store";
import {getError, getFetchingStatus, getFilms, getSearchingType, getSearchingYear} from "../../store/selectors";
import fetchFilms from "../../store/actions/thunks/fetchFilms";
import filmsStyles from './Films.module.scss'

export default function () {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [films, setFilms] = useState<IFilm[]>([]);

    const filmsFromState = useSelector((state: RootState) => getFilms(state))
    const isFetching = useSelector((state: RootState) => getFetchingStatus(state))
    const errorFromState = useSelector((state: RootState) => getError(state))
    const year = useSelector((state: RootState) => getSearchingYear(state))
    const type = useSelector((state: RootState) => getSearchingType(state))

    const dispatch = useDispatch<ReduxDispatch>();

    useEffect(() => {
        setLoading(isFetching)
    }, [isFetching])

    useEffect(() => {
        dispatch(fetchFilms(type, year)).then(_ => setLoading(false))
    }, [])

    useEffect(() => {
        setFilms(filmsFromState)
    }, [filmsFromState])

    useEffect(() => {
        setError(errorFromState)
    }, [errorFromState])

    return (
        <div className="films">
            <div className="films__inner">
                <h1 className={filmsStyles.title}>Топ-10 низкорейтинговых фильмов</h1>
            </div>
            {loading && <Spinner/>}
            {error && <Alert type={'danger'}>{error}</Alert>}
            {films.length > 0 ? <FilmsList films={films}/> : <Alert>Фильмов не найдено</Alert>}
        </div>
    )
}