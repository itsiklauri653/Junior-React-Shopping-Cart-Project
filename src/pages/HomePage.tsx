import React from "react";
import Products from "../components/Products/Products";
import { Category } from "../models/category";
import Product from "../models/product";

interface Props{
  categories: Category[],
  currency: string,
  handleAddToCart: (item:Product) => void
}

const HomePage:React.FC<Props> = ({categories,currency,handleAddToCart}) => (
  <div className="home-page-wrapper">
        <h2 className="title">Welcome to Our Store!</h2>
        {categories.map(category => (
          <>
            <h2 className="title">{category.name[0].toString().toUpperCase().concat(category.name.substr(1))}</h2>
            <Products
              cartAction={handleAddToCart} 
              products={category.products}
              currency = {currency}
            />
          </>
        ))}
    </div>
)
export default HomePage;