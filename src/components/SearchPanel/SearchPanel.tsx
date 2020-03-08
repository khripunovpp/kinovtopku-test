import React from "react";
import searchStyles from './SearchPanel.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {ReduxDispatch, RootState} from "../../store/store";
import fetchFilms from "../../store/actions/thunks/fetchFilms";
import {setSearchingType, setSearchingYear} from "../../store/actions/creators/searchPanelActions";
import {getSearchingType, getSearchingYear} from "../../store/selectors";

export default function () {
    const year = useSelector((state: RootState) => getSearchingYear(state))
    const type = useSelector((state: RootState) => getSearchingType(state))

    const dispatch = useDispatch<ReduxDispatch>()

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        dispatch(fetchFilms(type, year))
    }

    const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const year = Number(e.target.value);
        dispatch(setSearchingYear(year))
    }

    const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const type = e.target.value
        dispatch(setSearchingType(type))
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
                        <input type="tel" name="year" className="form-control" id="year" value={year}
                               onChange={handleYear}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Показать</button>
                </form>
            </div>
        </div>
    )
}