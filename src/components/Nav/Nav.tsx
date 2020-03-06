import React from "react";
import navStyles from "./Nav.module.scss";
import {ReactComponent as Logo} from "../../logo.svg";
import {Link} from "react-router-dom";

export default function () {
    return (
        <nav className={`navbar ${navStyles.nav}`}>
            <Link to='/' className={`navbar-brand ${navStyles.logo}`}>
                <Logo/>
                Киновтопку
            </Link>
        </nav>
    )
}