import React from "react";
import searchStyles from './SearchPanel.module.scss';

export default function () {
    return (
        <div className={searchStyles.search}>
            <div className="container">
                <h2 className={searchStyles.title}>Я ищу:</h2>
                <form>
                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="inlineCheckbox1" name="filmType" value="movie" checked />
                            <label className="form-check-label" htmlFor="inlineCheckbox1">Фильмы</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="inlineCheckbox2" name="filmType" value="tv"/>
                            <label className="form-check-label" htmlFor="inlineCheckbox2">Сериалы</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Снятые в </label>
                            <input type="password" name="year" className="form-control" id="year" />
                    </div>
                    <button type="submit" className="btn btn-primary">Показать</button>
                </form>
            </div>
        </div>
    )
}