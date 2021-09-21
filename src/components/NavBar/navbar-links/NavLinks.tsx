import React from "react";
import styled from 'styled-components';
import { Category } from "../../../models/category";
import NavLink from "./NavLink";

interface Props{
    categories: Category[]
}

export default function NavLinks({categories}:Props){
    return(
        <Container>
            {categories.map(category => (
                <NavLink key={category.name} label={category.name}/>
            ))}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;

    position: static;
    width: 234px;
    height: 56px;
    left: 0px;
    bottom: 0px;
`