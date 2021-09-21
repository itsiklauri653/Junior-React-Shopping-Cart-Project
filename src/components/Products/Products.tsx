import React from 'react';
import styled from 'styled-components';
import Product from '../../models/product';
import ProductCard from './ProductCard';

interface Props{
    products: Product[],
    cartAction: any,
    currency: string
}

const Products: React.FC<Props> = ({products, cartAction, currency}) => (
    <Container>
        {products.map(product => (
            <ProductCard 
                onClick={cartAction} 
                currency={currency}
                product={product} 
                key={product.id}
            />
        ))}
    </Container>
)

export default Products;

const Container = styled.div`
    display:grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 20px 40px;
    margin-left: 101px;
    margin-top: 220px;
`