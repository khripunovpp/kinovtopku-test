import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
import {ReduxDispatch} from "../../store/store"
import fetchMovie from "../../store/actions/thunks/fetchMovie"
import Spinner from "../Spinner/Spinner"
import {IFilm} from "../../types/types"
import {RouteComponentProps} from "react-router-dom"
import FilmDescription from "../FilmDescription/FilmDescription";

interface IProps {
    id: string
    type: string
}

type RoutePropsType = RouteComponentProps<IProps>

const FilmPage: React.FC<RoutePropsType> = (props) => {

    const {id, type} = props.match.params

    const [loading, setLoading] = useState(true)
    const [film, setFilm] = useState<IFilm | null>(null)

    const dispatch = useDispatch<ReduxDispatch>()

    useEffect(() => {
        dispatch(fetchMovie(Number(id), type)).then(film => {
            console.log(film)
            setFilm(film)
            setLoading(false)
        })
    }, [])
    
    return (
        <div className="filmPage">
            <div className="container">
                {loading && <Spinner/>}
                {film && <FilmDescription data={film}/>}
            </div>
        </div>
    )
}

export default FilmPage