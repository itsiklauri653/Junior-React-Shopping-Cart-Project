import React from 'react';
import './ProductCard.scss';
import Product from '../../models/product';
import emptyCart from '../../assets/empty-cart-white.svg';
import { NavLink } from 'react-router-dom';
import { getCurrencySymbol, getPrice } from '../../helpers/PriceHelper';

interface Props{
    product: Product,
    onClick: (product: Product) => void,
    currency: string
}

export default function ProductCard({product, onClick, currency}: Props){
    return(
        <div className={`card-container ${!product.inStock ? "card-container--out" : ""}`}>
                <div className="card">
                    <div className="image-container">
                        <div className="out-of-stock">OUT OF STOCK</div>
                        <div className="badge"></div>
                        <div className="circle-icon">
                            <div className="circle">
                                <button disabled={!product.inStock} 
                                    onClick={() => onClick(product)} 
                                    type="button"
                                >
                                    <img alt="empty" src={emptyCart}/>
                                </button>
                            </div>
                        </div>
                        
                        <NavLink
                            to={{pathname:"/product/" + product.id,state:product}} 
                            style={{background:"none",border:"none", textDecoration:"none", color:"black"}}>
                            <img style={{width:"354px",height:"330px"}}className="product-img" alt=" " src={product.gallery[0]}/>
                        </NavLink>
                    </div>
                    <div className="spacer"></div>
                    <div className="content">
                        <div className="price">
                            <div>
                                <span>{getCurrencySymbol(currency)}{getPrice(currency,product)}</span>
                            </div>
                        </div>
                        <span className="title">{product.name}</span>
                    </div>
                </div>
        </div>
    )
}