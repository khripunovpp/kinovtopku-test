import {createStore, applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";
import {filmsReducer} from './reducers/filmsReducer'

const reducers = combineReducers({
    filmsState: filmsReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export {
    store
}