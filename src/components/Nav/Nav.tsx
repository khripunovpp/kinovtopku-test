import React from "react";
import navStyles from "./Nav.module.scss";
import {ReactComponent as Logo} from "../../logo.svg";

export default function () {
    return (
        <nav className={`navbar ${navStyles.nav}`}>
            <a className={`navbar-brand ${navStyles.logo}`} href="">
                <Logo/>
                Киновтопку
            </a>
        </nav>
    )
}