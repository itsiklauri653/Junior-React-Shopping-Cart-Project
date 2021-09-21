import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CartDropdown from "../../components/Cart/CartDropdown";
import { getCurrencySymbol, getPrice } from "../../helpers/PriceHelper";
import Product from "../../models/product";
import './product.scss';

interface Props{
    addToCart: (item:Product) => void,
    currency: string,
}

const ProductPage:React.FC<Props> = ({addToCart,currency}
) => {
    const location = useLocation();
    const product = location.state as Product

    return(
        <Container>
            <div className="images">
                {product.gallery.filter((img,i) => i !== 0).map(img => (
                    <div className="product-image-container">
                        <img src={img} />
                    </div>
                ))}
            </div>
            <div className="main-image">
                <img src={product.gallery[0]}/>
            </div>
            <div className="product-info-container">
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
                    {product.attributes.map(attr => (
                        <>
                            <div className="attr-name">{attr.name.toUpperCase()}</div>
                            <div className="attr-items">
                                {attr.items.map(item => (
                                    <>
                                        {attr.type === "swatch" ? 
                                            <NavLink 
                                                activeClassName="attr-item-active" 
                                                to={{pathname:"/product/" + product.id + `?${attr.name}=${item.value}`,state:product}} 
                                                className="attr-item" 
                                                style={{background:item.value}}></NavLink> :
                                            <NavLink 
                                                activeClassName="attr-item-active-non-swatch" 
                                                to={{pathname:"/product/" + product.id + `?${attr.name}=${item.value}`,state:product}}  
                                                className="attr-item">{item.value}</NavLink>}
                                    </>
                                ))}
                            </div>
                        </>
                    ))}
                </div>
                <div className="product-price">
                    <span className="name">PRICE:</span>
                    <span className="amount">{getCurrencySymbol(currency)}{getPrice(currency,product)}</span>
                </div>
                <button className="add-to-cart" disabled={!product.inStock} onClick={() => addToCart(product)} type="button" style={{background:"none",border:"none"}}>
                    <div className="add-to-cart-button">ADD TO CART</div>
                </button>
                <div dangerouslySetInnerHTML={{__html:product.description}} className="description"></div>
            </div>
        </Container>
    )
}

export default ProductPage;

const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    top: 122px;
    left: 100px;
`