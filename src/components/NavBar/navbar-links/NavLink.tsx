import React from 'react';
import './navbar-link.scss';
import { NavLink as Link } from 'react-router-dom';

interface Props {
    label: string
}

const NavLink: React.FC<Props> = ({ label }) => (
    <div className="navlink-container">
        <Link id={label} activeClassName='label-active' className='label'
            to={{ pathname: "/category=" + label, state: { isOpen: false } }}>
            <span>{label}</span>
        </Link>
    </div>
)

export default NavLink;