import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCurrencySymbol, getPrice } from "../../helpers/PriceHelper";
import { DefaultAttribute } from "../../models/attributes";
import Product from "../../models/product";
import './product.scss';

interface Props{
    addToCart: (item:Product) => void,
    currency: string,
    changeTextAttribute: (selector:string, attrValue:string, attrName:string) => void
    changeColor: (selector:string, attrValue:string) => void,
    attr: DefaultAttribute
}

const ProductPage:React.FC<Props> = ({addToCart,currency, changeColor, changeTextAttribute, attr}
) => {
    const location = useLocation();
    const product = location.state as Product

    const[mainImage,setMainImage] = useState(product.gallery[0]);

    var selector = `#${product.id} div.product-attribute div.attributes`

    useEffect(() => {
        document.getElementsByClassName("description")[0].innerHTML = product.description
    },[product.description])

    return(
        <div className="product-page-container">
            <div className="images">
                {product.gallery.map(img => (
                    <div style={{cursor:"pointer"}} 
                        key={img} 
                        onClick={() => setMainImage(img)} 
                        className="product-image-container">
                        <img alt=" " src={img} />
                    </div>
                ))}
            </div>
            <div className={`main-image ${!product.inStock ? "main-image--out" : ""}`}>
                <div className="out-of-stock">OUT OF STOCK</div>
                <img alt=" " src={mainImage}/>
            </div>
            <div id={product.id} className="product-info-container">
                <div className="product-name">
                    <span>
                        {product.name.substr(0,product.name.indexOf(" ")) !== "" ? 
                                    product.name.substr(0,product.name.indexOf(" ")) : product.name
                                }
                    </span>
                    {product.name.indexOf(" ") !== -1 ?
                                product.name.substr(product.name.indexOf(" ")) :
                                "" 
                            }
                </div>
                <div className="product-attribute">
                    {product.attributes.map(attribute => (
                        <div className="attributes">
                            <div className="attr-name">{attribute.name.toUpperCase()}</div>
                            <div className="attr-items">
                                {attribute.items.map(item => (
                                    <>
                                        {attribute.type === "swatch" ? 
                                            <div onClick={() => changeColor(selector,item.value)} 
                                                className={`item ${attr.name === attribute.name && attr.value === item.value ? "attr-active" : ""}`}  style={{background:item.value}}></div> :
                                            <div onClick={() => changeTextAttribute(selector,item.value,attribute.name)} 
                                                className={`item ${attr.name === attribute.name && attr.value === item.value ? "attr-active" : ""}`} >{item.value}</div>}
                                    </>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="product-price">
                    <span className="name">PRICE:</span>
                    <span className="amount">{getCurrencySymbol(currency)}{getPrice(currency,product)}</span>
                </div>
                <button className="add-to-cart" disabled={!product.inStock} onClick={() => addToCart(product)} type="button" style={{background:"none",border:"none"}}>
                    <div className="add-to-cart-button">ADD TO CART</div>
                </button>
                <div className="description"></div>
            </div>
        </div>
    )
}

export default ProductPage;