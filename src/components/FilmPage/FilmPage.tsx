import React from "react";

interface props {
    id: string
}

const FilmPage = ({id}: props) => {
    return (
        <p>Фильм {id}</p>
    )
}

export default FilmPage