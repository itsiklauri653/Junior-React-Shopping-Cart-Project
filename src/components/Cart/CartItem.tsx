import React from "react";
import { NavLink } from "react-router-dom";
import { getCurrencySymbol, getPrice } from "../../helpers/PriceHelper";
import AttributeSet from "../../models/attribute-set";
import { Attribute, DefaultAttribute } from "../../models/attributes";
import Product from "../../models/product";

interface Props{
    product: Product,
    addToCart: (item: Product) => void,
    removeFromCart: (id: string) => void,
    currency: string,
    changeTextAttribute:(selector:string, attrValue:string) => void,
    changeColor:(selector:string, attrValue:string) => void,
    attr: DefaultAttribute
}

const CartItem: React.FC<Props> = ({product, addToCart, removeFromCart, 
    currency, changeTextAttribute, changeColor, attr}) => {
    const attrSelector = "div.product-container div.info div.attributes";
    const isActive = (attribute:AttributeSet, item:Attribute) => {
        return attr.name === attribute.name && 
            attr.value === item.value;
    }

    return(
        <div key={product.id} className="product-container">
            <div className="info">
                <span className="title">{product.name}</span>
                <span className="price">{getCurrencySymbol(currency)}{getPrice(currency,product)}</span>
                {product.attributes.map(attribute => (
                        <div className="attributes">
                            <div className="attr-name">{attribute.name}</div>
                            <div key={attribute.id} className="items">
                            {attribute.items.map(item => (
                                <>
                                {console.log(attr.name)}
                                {attribute.type === "swatch" ?
                                    <div onClick={() => changeColor(attrSelector,item.value)} key={item.id} 
                                        className={`item ${isActive(attribute,item)? "attr-color-active" : ""}`} style={{background:item.value}}></div> :
                                    <div onClick={() => changeTextAttribute(attrSelector,item.value)} key={item.id} 
                                        className={`item ${isActive(attribute,item)? "attr-active" : ""}`}>{item.value}</div>
                                }
                                </>
                            ))}
                        </div>
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