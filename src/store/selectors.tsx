import {RootState} from "./store";

export const getFilms = (state: RootState) => state.filmsState.films;
export const getFetchingStatus = (state: RootState) => state.filmsState.loading;
export const getError = (state: RootState) => state.filmsState.errors;
export const getUpdatedDate = (state: RootState) => state.filmsState.updatedAt;
export const getSearchingYear = (state: RootState) => state.searchState.year;
export const getSearchingType = (state: RootState) => state.searchState.type;
