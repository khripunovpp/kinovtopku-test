import {RootState} from "./store";

export const getFilms = (state: RootState) => state.filmsState.films;
export const getFetchingStatus = (state: RootState) => state.filmsState.loading;
export const getError = (state: RootState) => state.filmsState.errors;
