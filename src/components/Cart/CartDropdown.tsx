import React from "react";
import { NavLink } from "react-router-dom";
import { calculateTotal } from "../../helpers/PriceHelper";
import { DefaultAttribute } from "../../models/attributes";
import Product from "../../models/product";
import './cart-dropdown.scss';
import CartItem from "./CartItem";

interface Props {
    products: Product[],
    addToCart: (item: Product) => void,
    removeFromCart: (id: string) => void,
    currency: string,
    changeTextAttribute: (selector: string, attrValue: string) => void,
    changeColor: (selector: string, attrValue: string) => void,
    closeCartDropdown: () => void,
    attribute: DefaultAttribute
}

const CartDropdown: React.FC<Props> = ({products, addToCart, removeFromCart,
    currency, closeCartDropdown, changeTextAttribute, changeColor, attribute}) => {
    return (
        <div className="container">
            <span className="cart-title">
                <strong>My Bag</strong> {products.length === 0 ?
                    <></> : <>,{products.length} items</>}
            </span>
            {products.length === 0 ?
                <div className="empty-message">Cart is empty! Please add items first.</div> :
                <>
                    <div className="products">
                        {products.map(product => (
                            <CartItem
                                attr={attribute}
                                changeTextAttribute={changeTextAttribute}
                                changeColor={changeColor}
                                currency={currency}
                                key={product.id}
                                product={product}
                                addToCart={addToCart}
                                removeFromCart={removeFromCart}
                            />
                        ))}
                    </div>
                    <div className="total">
                        <div className="total-word"><strong>Total</strong></div>
                        <div className="total-amount"><strong>${calculateTotal(products, currency).toFixed(2)}</strong></div>
                    </div>
                    <div className="buttons">
                        <NavLink onClick={closeCartDropdown} className='bag' to={{ pathname: "/cart", state: products }}>VIEW BAG</NavLink>
                        <button className='check-out' type="submit">CHECK OUT</button>
                    </div>
                </>
            }
        </div>
    )
}

export default CartDropdown;