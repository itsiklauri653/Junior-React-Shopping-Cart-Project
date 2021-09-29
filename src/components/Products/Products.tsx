import React from 'react';
import Product from '../../models/product';
import ProductCard from './ProductCard';

interface Props {
    products: Product[],
    cartAction: any,
    currency: string
}

const Products: React.FC<Props> = ({ products, cartAction, currency }) => {
    return (
        <div className="products-list-container">
            {products.map(product => (
                <ProductCard
                    onClick={cartAction}
                    currency={currency}
                    product={product}
                    key={product.id}
                />
            ))}
        </div>
    )
}

export default Products;