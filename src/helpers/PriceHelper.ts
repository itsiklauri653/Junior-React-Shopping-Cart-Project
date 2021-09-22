import Product from "../models/product"

interface currencyFormat {
    name: string,
    symbol: string
}

export const getCurrencySymbol = (currency: string) => {
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
export const getPrice = (currency: string, product: Product | undefined) => {
    if(product){
        const prod = product.prices.find(price => price.currency === currency)
        if(prod?.amount){
            return prod.amount;
        }
        return 0;
    }
    return 0;
}

export const getCurrencySymbols = (currencies: string[]) => {
    const symbols:currencyFormat[] = [];
    currencies.forEach(currency => {
        switch(currency){
            case "USD": symbols.push({name:currency, symbol: "$"})
                break;
            case "GBP": symbols.push({name:currency,symbol:"£"})
                break;
            case "AUD": symbols.push({name:currency,symbol:"A$"})
                break;
            case "JPY": symbols.push({name:currency,symbol:"¥"})
                break;
            case "RUB": symbols.push({name:currency,symbol:"₱"})
                break;
        }
    })

    return symbols;
}

export const calculateTotal = (items: Product[], currency:string) =>{
    return items.reduce((ack:number, item) => ack + item.amount * getPrice(currency,item),0);
}