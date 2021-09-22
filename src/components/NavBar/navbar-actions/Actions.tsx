import React from "react";
import emptyCart from '../../../assets/empty-cart.svg';
import vector from '../../../assets/vector.svg';
import './navbar-actions.scss';

interface Props{
    cartItemsCount: number,
    clickOnCart: any,
    clickOnCurrency: any,
    currency: string
}
export default function Actions({cartItemsCount, clickOnCart, clickOnCurrency, currency}: Props) {
    const getCurrencySymbol = (currency: string) => {
        switch(currency){
            case "USD": return "$"
            case "GBP": return "£"
            case "AUD": return "A$"
            case "JPY": return "¥"
            case "RUB": return "₱"
            default:
                return "$"
        }
    }

    return (
        <div className="action-container">
            <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="icon-container">
                <button onClick={clickOnCart} type="button" style={{background:"none",border:"none",cursor:"pointer"}}>
                    <span className="product-count">{cartItemsCount}</span>
                    <img className="empty-cart" alt=" " src={emptyCart} />
                </button>
            </div>
            <div className="currency-container">
                <div className="currency-symbol">
                    <button onClick={clickOnCurrency} type="button"  style={{background:"none",border:"none",cursor:"pointer"}}>
                        <span>{getCurrencySymbol(currency)}</span>
                    </button>
                </div>
                <img className="vector" alt=" " src={vector} />
            </div>
        </div>
    )
}