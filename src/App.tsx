import React from 'react';
import Header from "./components/Header/Header";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import mainStyles from './Main.module.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import FilmPage from "./components/FilmPage/FilmPage";
import Films from "./components/Films/Films";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <div className={mainStyles.main}>
                    <div className="container">
                        <div className="row">
                            <Switch>
                                <Route path='/' exact render={() =>
                                    <>
                                        <div className={`col-md-2 ${mainStyles.searchPanel}`}><SearchPanel/></div>
                                        <div className={`col-md-10 ${mainStyles.filmsList}`}><Films/></div>
                                    </>
                                }/>
                                <Route path='/:id' exact render={(props) =>
                                    <FilmPage id={props.match.params.id}/>
                                }/>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App;
