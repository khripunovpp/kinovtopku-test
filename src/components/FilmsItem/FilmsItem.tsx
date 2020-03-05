import React from "react";
import {IFilm} from "../../types/types";

interface props {
    data: IFilm
}

const FilmsItem = ({data}: props) => {
    const {poster, name, year, description} = data;
    const posterUrl = poster || 'https://via.placeholder.com/500x500';

    return (
        <div className="filmPanel">
            <div className="row filmPanel__inner">
                <div className="col-md-4">
                    <img src={posterUrl} className="card-img filmPanel__poster" alt={name}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body filmPanel__tail">
                        <h5 className="card-title filmPanel__name">{name} <span
                            className=" filmPanel__year">{year}</span></h5>
                        { description && <p className="card-text filmPanel__description">{description}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilmsItem