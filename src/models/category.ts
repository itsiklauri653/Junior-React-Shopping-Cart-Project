import Product from "./product";
import { CategoryType } from "./types/categoryType";

export interface Category{
    name: CategoryType,
    products: Product[]
}