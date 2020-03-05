import headerStyles from './Header.module.scss';
import React from "react";
import Nav from "../Nav/Nav";

export default function () {
    return (
        <header className={headerStyles.header}>
            <Nav/>
        </header>
    )
}