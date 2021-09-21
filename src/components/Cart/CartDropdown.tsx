import React from "react";
import { NavLink } from "react-router-dom";
import Product from "../../models/product";
import './cart-dropdown.scss';
import CartItem from "./CartItem";

interface Props{
    products: Product[],
    addToCart: (item: Product) => void,
    removeFromCart: (id: string) => void,
    currency: string,
    closeCartDropdown:() => void
}

export default function CartDropdown({products, addToCart, removeFromCart, currency,closeCartDropdown}: Props){
    const calculateTotal = (items: Product[]) =>{
        return items.reduce((ack:number, item) => ack + item.amount * getPrice(currency,item),0);
    }
    
    const getPrice = (currency: string, product: Product | undefined) => {
        if(product){
            const prod = product.prices.find(price => price.currency === currency)
            if(prod?.amount){
                return prod.amount;
            }
            return 0;
        }
        return 0;
    }

    return(
        <div className="container">
            <span className="cart-title">
                <strong>My Bag</strong> {products.length === 0 ? 
                <></> : <>,{products.length} items</>}
            </span>
            {products.length === 0 ? 
                <div className="empty-message">Cart is empty! Please add items first.</div> :
                <>
                    {products.map(product => (
                        <CartItem 
                            currency={currency}
                            key={product.id} 
                            product = {product}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}    
                        />
                    ))}
                    <div className="total">
                        <div className="total-word"><strong>Total</strong></div>
                        <div className="total-amount"><strong>${calculateTotal(products).toFixed(2)}</strong></div>                           
                    </div>
                    <div className="buttons">
                        <NavLink onClick={closeCartDropdown} className='bag' to={{pathname:"/cart",state:products}}>VIEW BAG</NavLink>
                        <button className='check-out' type="submit">CHECK OUT</button>
                    </div>
                </>
            }
        </div>
    )
}