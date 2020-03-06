import {createStore, applyMiddleware, combineReducers, AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {filmsReducer} from './reducers/filmsReducer';

const reducers = combineReducers({
    filmsState: filmsReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducers>;
export type ReduxDispatch = ThunkDispatch<RootState, any, AnyAction>

export {
    store
}