import React, { useState } from "react";
import searchStyles from './SearchPanel.module.scss';
import {useDispatch} from "react-redux";
import {ReduxDispatch} from "../../store/store";
import fetchFilms from "../../store/actions/fetchFilms";

export default function () {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState<number>(currentYear);
    const [type, setType] = useState<string>('movie');

    const dispatch = useDispatch<ReduxDispatch>();

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(fetchFilms(type, year));
    }

    const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setYear(Number(e.target.value))
    }

    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setType(e.target.value);
    }

    return (
        <div className={searchStyles.search}>
            <div className="container">
                <h2 className={searchStyles.title}>Я ищу:</h2>
                <form>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="inlineCheckbox1" name="filmType"
                                   value="movie" checked={type === 'movie' && true} onChange={handleType}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox1">Фильмы</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="inlineCheckbox2" name="filmType"
                                   value="tv" checked={type === 'tv' && true} onChange={handleType}/>
                            <label className="form-check-label" htmlFor="inlineCheckbox2">Сериалы</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Снятые в </label>
                        <input type="tel" name="year" className="form-control" id="year" value={year} onChange={handleYear}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Показать</button>
                </form>
            </div>
        </div>
    )
}