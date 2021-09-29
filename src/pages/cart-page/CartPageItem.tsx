import React, { useState } from "react";
import { getCurrencySymbol, getPrice } from "../../helpers/PriceHelper";
import { DefaultAttribute } from "../../models/attributes";
import Product from "../../models/product";
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow from '../../assets/right-arrow.svg';

interface Props{
    product: Product,
    index: number,
    addToCart: (item: Product) => void,
    removeFromCart: (id: string) => void,
    currency: string,
    changeTextAttribute: (selector:string, attrValue:string) => void
    changeColor: (selector:string, attrValue:string) => void,
    attr: DefaultAttribute
}

const CartPageItem:React.FC<Props> = ({product, index, addToCart, removeFromCart, currency, changeColor, changeTextAttribute, attr}) => {
    var selector = `#${product.id} div.cart-page-info div.cart-page-items`
    
    const [imgIndex, setImgIndex] = useState(0);
    const [mainImage, setMainImage] = useState(product.gallery[imgIndex]);
    
    const handleImageChangeWithLeftArrow = () => {
        if(imgIndex - 1 < 0){
            setImgIndex(product.gallery.length - 1)
        }
        else{
            setImgIndex(prev => prev - 1);
        }
        setMainImage(prev => prev = product.gallery[imgIndex])
    }

    const handleImageChangeWithRightArrow = () => {
        if(imgIndex + 1 === product.gallery.length){
            setImgIndex(0)
        }
        else{
            setImgIndex(prev => prev + 1);
        }
        setMainImage(prev => prev = product.gallery[imgIndex])
    }

    return(
        <>
            <div key={index} className="linebreak"></div>
            <div id={product.id} key={product.id} className="cart-page-product-container">
                <div className="cart-page-info">
                    <span className="cart-page-title">
                        <span className="cart-page-product-name">
                            {product.name.substr(0,product.name.indexOf(" ")) !== "" ? 
                                product.name.substr(0,product.name.indexOf(" ")) : product.name
                            }
                        </span>
                            {product.name.indexOf(" ") !== -1 ?
                                product.name.substr(product.name.indexOf(" ")) :
                                ""
                            }
                        </span>
                    <span className="cart-page-product-price">{getCurrencySymbol(currency)}{getPrice(currency,product)}</span>
                    {product.attributes.map(attribute => (
                            <div key={attribute.id} className="cart-page-items">
                                <div className="attr-name">{attribute.name}</div>
                                <div className="items">
                                {attribute.items.map(item => (
                                    <div key={item.id}>
                                        {attribute.type === "swatch" ? 
                                            <div onClick={() => changeColor(selector, item.value)} 
                                                key={item.id} 
                                                className={`item ${attr.name === attribute.name && attr.value === item.value ? "attr-color-active" : ""}`} 
                                                style={{background:item.value}}></div> :
                                            <div onClick={() => changeTextAttribute(selector, item.value)} 
                                                key={item.id} id={item.id} 
                                                className={`item ${attr.name === attribute.name && attr.value === item.value ? "attr-active" : ""}`}>
                                                    {item.value}
                                            </div>}
                                        
                                    </div>
                                ))}
                                </div>
                            </div>
                        ))}
                </div>
                <div className="cart-page-amount-image">
                    <div className="cart-page-amount">
                        <div onClick={() => addToCart(product)} className="box">+</div>
                        <div className="box number">{product.amount}</div>
                        <div onClick={() => removeFromCart(product.id)} className="box">-</div>
                    </div>
                    <div className="cart-page-image">
                        <div 
                            className="arrow-container left-arrow-container"
                            onClick={() => handleImageChangeWithLeftArrow()}>
                            <img className="arrow arrow-left" src={leftArrow} alt="" />
                        </div>
                        <div 
                            onClick={() => handleImageChangeWithRightArrow()} 
                            className="arrow-container right-arrow-container">
                                <img className="arrow arrow-right" src={rightArrow} alt="" />
                        </div>
                        <img className="item-main-image" src={mainImage} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPageItem;