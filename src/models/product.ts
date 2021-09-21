import AttributeSet from "./attribute-set";
import Price from "./price";
import { CategoryType } from "./types/categoryType";

export default interface Product{
    id: string,
    name:string,
    brand: string,
    inStock: boolean,
    category: CategoryType,
    description: string,
    gallery: string[],
    attributes: AttributeSet[],
    prices: Price[]
    amount: number
}