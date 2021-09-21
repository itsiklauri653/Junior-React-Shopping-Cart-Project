import React from "react";
import { getCurrencySymbols } from "../../helpers/PriceHelper";
import './currency-dropdown.scss';

interface Props{
    currencies:string[],
    changeCurrency: (currency: string) => void
}

export default function CurrencyOverLay({currencies, changeCurrency}:Props){
    const currenciesWithSymbols = getCurrencySymbols(currencies);
    return(
        <div className="currency-switcher-container">
            {currenciesWithSymbols.map((currency:any) => (
                <div key={currency.name} className="currency">
                    <button 
                        onClick={() => changeCurrency(currency.name)}
                        style={{background:"none",border:"none", cursor:"pointer"}}
                    >
                        <span className="symbol">{currency.symbol}</span>
                        <span className="name">{currency.name}</span>
                    </button>
                </div>
            ))}
        </div>
    )
}