import React from "react";
import { Category } from "../../../models/category";
import NavLink from "./NavLink";

interface Props {
    categories: Category[]
}

const NavLinks: React.FC<Props> = ({ categories }) => (
    <div className="nav-links-container">
        {categories.map(category => (
            <NavLink key={category.name} label={category.name} />
        ))}
    </div>
)


export default NavLinks;