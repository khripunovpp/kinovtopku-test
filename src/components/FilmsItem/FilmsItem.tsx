import React from "react";
import {IFilm} from "../../types/types";

interface props {
    data: IFilm
}

const FilmsItem = ({data}: props) => {
    const {poster, name, year, description} = data;

    return (
            <div className="row">
                <div className="col-md-2">
                    <img src={poster} className="card-img" alt={name}/>
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <h5 className="card-title">{name} <span>{year}</span></h5>
                        { description && <p className="card-text">{description}</p>}
                    </div>
                </div>
            </div>
    )
}

export default FilmsItem