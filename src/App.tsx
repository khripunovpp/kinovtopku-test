import React from 'react';
import Header from "./components/Header/Header";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import FilmsList from "./components/FilmsList/FilmsList";
import mainStyles from './Main.module.scss';

function App() {
    return (
        <div className="App">
            <Header/>
            <div className={mainStyles.main}>
                <div className="container">
                    <div className="row">
                        <div className={`col-md-2 ${mainStyles.searchPanel}`}><SearchPanel/></div>
                        <div className={`col-md-10 ${mainStyles.filmsList}`}><FilmsList/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
