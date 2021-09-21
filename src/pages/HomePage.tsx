import request, { gql } from "graphql-request";
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import Products from "../components/Products/Products";
import NavBar from "../components/NavBar/NavBar";
import { Category } from "../models/category";

export default function HomePage(){
    const query = gql`
  {
    categories{
      name,
      products{
        id,
        name,
        inStock,
        gallery,
        description,
        category,
        attributes{
          id,
          name,
          type,
          items{
            id,
            displayValue,
            value
          }
        }
        prices{
          currency,
          amount
        },
        brand
      }
    }
  }
  `
  const {data, isError, isLoading} = useQuery('categories', () => {
    return request("http://localhost:4000/",query);
  })

  if(isError) return <div>Error!</div>
  if(isLoading) return <div>Loading...</div>

  const categories: Category[] = data.categories;
  console.log(data);

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