import React from "react";
import FilmsList from "../FilmsList/FilmsList";

export default function () {
    return (
        <div className="films">
                <div className="films__inner">
                    <h1 className='films__title'>Топ-10 низкорейтинговых фильмов</h1>
                </div>
                <FilmsList/>
        </div>
    )
}