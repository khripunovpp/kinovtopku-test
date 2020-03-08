import React from 'react';
import SearchPanel from "../SearchPanel/SearchPanel";
import mainStyles from './Main.module.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import FilmPage from "../FilmPage/FilmPage";
import Films from "../Films/Films";

function Main() {
    return (
        <div className={mainStyles.main}>
            <div className="container">
                <div className="row">
                    <Switch>
                        <Route path='/' exact render={() =>
                            <>
                                <div className={`col-md-3 ${mainStyles.searchPanel}`}><SearchPanel/></div>
                                <div className={`col-md-9 ${mainStyles.filmsList}`}><Films/></div>
                            </>
                        }/>
                        <Route path='/:type/:id' exact render={(props) =>
                            <FilmPage {...props} />
                        }/>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Main;
