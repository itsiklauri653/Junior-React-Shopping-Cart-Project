import React from "react";
import { NavLink } from "react-router-dom";
import { getCurrencySymbol, getPrice } from "../../helpers/PriceHelper";
import Product from "../../models/product";

interface Props{
    product: Product,
    addToCart: (item: Product) => void,
    removeFromCart: (id: string) => void,
    currency: string
}

const CartItem: React.FC<Props> = ({product, addToCart, removeFromCart, currency}) => {
    return(
        <div key={product.id} className="product-container">
            <div className="info">
                <span className="title">{product.name}</span>
                <span className="price">{getCurrencySymbol(currency)}{getPrice(currency,product)}</span>
                {product.attributes.map(attribute => (
                        <div key={attribute.id} className="items">
                            {attribute.items.map(item => (
                                <>
                                {attribute.type === "swatch" ?
                                    <div key={item.id} className="item" style={{background:item.value}}></div> :
                                    <div key={item.id} className="item">{item.value}</div>
                                }
                                </>
                            ))}
                        </div>
                    ))}
            </div>
            <div className="amount-image">
                <div className="amount">
                    <button onClick={() => addToCart(product)} className="box">+</button>
                    <div className="item-amount">{product.amount}</div>
                    <button onClick={() => removeFromCart(product.id)} className="box">-</button>
                </div>
                <NavLink to={{pathname:"/product/" + product.id,state:product}}
                        style={{background:"none",border:"none",textDecoration:"none",color:"black"}}
                        >
                <div className="image">
                    <img src={product.gallery[0]} alt="" />
                </div>
                </NavLink>
            </div>
        </div>
    )
}

export default CartItem;