import Attribute from "./attributes";
import { AttributeType } from "./types/attributeType";

export default interface AttributeSet{
    id:string,
    name: string,
    items: Attribute[],
    type: AttributeType
}