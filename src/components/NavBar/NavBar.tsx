import React from "react";
import logo from '../../assets/a-logo.svg';
import './navbar.scss';
import Actions from "./navbar-actions/Actions";
import NavLinks from "./navbar-links/NavLinks";
import { Category } from "../../models/category";
import { NavLink } from "react-router-dom";

interface Props {
    categories: Category[],
    cartItemsCount: number,
    clickOnCart: any,
    clickOnCurrency: any,
    currency: string,
    cartIsOpen: boolean,
    currencyIsOpen: boolean
}

const NavBar: React.FC<Props> = ({ categories, cartIsOpen, cartItemsCount, 
    clickOnCart, clickOnCurrency, currency, currencyIsOpen }
) => (
    <div className="header">
        <div className="navbar-container">
            <NavLinks categories={categories} />
        </div>
        <NavLink to={{ pathname: "/", state: { isOpen: false } }}><img className="logo" alt="logo" src={logo} /></NavLink>
        <Actions
            cartIsOpen={cartIsOpen}
            currencyIsOpen={currencyIsOpen}
            currency={currency}
            clickOnCurrency={clickOnCurrency}
            clickOnCart={clickOnCart}
            cartItemsCount={cartItemsCount}
        />
    </div>
)


export default NavBar;
