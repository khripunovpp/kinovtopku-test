import {RootState} from "./store";

const getFilms = (state: RootState) => state.filmsState.films;

export {getFilms}