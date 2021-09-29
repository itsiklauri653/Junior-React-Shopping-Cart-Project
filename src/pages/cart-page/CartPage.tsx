import React from "react";
import CartDropdown from "../../components/Cart/CartDropdown";
import CurrencyOverLay from "../../components/Currency/CurrencyDropdown";
import { DefaultAttribute } from "../../models/attributes";
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
    currencies: string[],
    changeTextAttribute: (selector:string, attrValue:string) => void
    changeColor: (selector:string, attrValue:string) => void,
    attribute: DefaultAttribute
}

const CartPage:React.FC<Props> = ({products, addToCart, removeFromCart, 
    currency, cartIsOpen, currencyOpen,closeCartDropdown, changeCurrency, 
    currencies, changeTextAttribute, changeColor, attribute}) => {
    return (
        <div className="cart-page-wrapper">
            {cartIsOpen &&
                    <CartDropdown 
                      attribute={attribute}
                      changeTextAttribute={changeTextAttribute}
                      changeColor={changeColor}
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
            <h2 className="title">CART</h2>
            <div className="cart-page-container">
            {products.length === 0 &&
                <div>Cart is Empty!!</div>}
            {products.map((product,i) => (
                <CartPageItem
                    attr={attribute}
                    changeTextAttribute={changeTextAttribute}
                    changeColor={changeColor}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    key={product.id + i}
                    currency={currency} 
                    product={product} 
                    index={i} 
                />
            ))}
            </div>
        </div>
      );
    }

    export default CartPage