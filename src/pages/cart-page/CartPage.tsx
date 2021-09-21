import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CartDropdown from "../../components/Cart/CartDropdown";
import CurrencyOverLay from "../../components/Currency/CurrencyDropdown";
import Product from "../../models/product";
import './cart.scss';
import CartPageItem from "./CartPageItem";

interface Props{
    products: Product[],
    addToCart: (item: Product) => void,
    removeFromCart: (id: string) => void,
    currency: string,
    cartIsOpen: boolean,
    currencyOpen: boolean,
    closeCartDropdown: () => void,
    changeCurrency: (currency: string) => void,
    currencies: string[]
}

const CartPage:React.FC<Props> = ({products, addToCart, removeFromCart, 
    currency, cartIsOpen, currencyOpen,closeCartDropdown, changeCurrency, currencies}) => {
    return (
        <Container>
            {cartIsOpen &&
                    <CartDropdown 
                      closeCartDropdown={closeCartDropdown}
                      currency={currency}
                      products={products} 
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                    />
                }
                {currencyOpen &&
                    <CurrencyOverLay 
                      changeCurrency={() => changeCurrency(currency)}
                      currencies={currencies}
                    />
                }
            <Title>CART</Title>
            <div className="cart-page-container">
            {products.length === 0 &&
                <div>Cart is Empty!!</div>}
            {products.map((product,i) => (
                <CartPageItem 
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    key={i}
                    currency={currency} 
                    product={product} 
                    index={i} 
                />
            ))}
            </div>
        </Container>
      );
    }

    export default CartPage
    
    const Container = styled.div`
      position: relative;
      width: 100%;
    `
    
    
    const Title = styled.h2`
        position: relative;
        height: 68px;
        left: 101px;
        top: 106.5px;
        letter-spacing: -0.3px;
    
        font-family: Raleway;
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 160%;
    
        display: flex;
        align-items: center;
    
        color: #1D1F22;
    `