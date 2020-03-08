import {SET_SEARCHING_TYPE, SET_SEARCHING_YEAR} from "../constants";
import {TSetSearchingTypeActionType, TSetSearchingYearActionType} from "../../../types/types";

export const setSearchingYear = (year: number): TSetSearchingYearActionType => ({type: SET_SEARCHING_YEAR, payload: year})
export const setSearchingType = (type: string): TSetSearchingTypeActionType => ({type: SET_SEARCHING_TYPE, payload: type})