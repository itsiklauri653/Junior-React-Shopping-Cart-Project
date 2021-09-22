import React from "react";
import styled from "styled-components";

export default function HomePage(){
  return (
    <Container >
        <Title>Welcome to Our Store!</Title>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
`


const Title = styled.h2`
    position: relative;
    height: 68px;
    left: 101px;
    top: 40.5px;
    letter-spacing: -0.3px;
    /* Heading / Desktop / H2 */

    font-family: Raleway;
    font-style: normal;
    font-weight: normal;
    font-size: 42px;
    line-height: 160%;
    /* identical to box height, or 67px */

    display: flex;
    align-items: center;

    /* --c-text */

    color: #1D1F22;
`