export type Lang = "en" | "th"
export function LangParse(s:any):Lang {
    if (s === "en" || s === "th"){
        return s as Lang
    }
    return "en" as Lang
}

export type Items = Record<string, Record<Lang, string>>

export type OrdersProps = {
    token: string
    lang: Lang
}
export type OrderProps = {
    token: string
    lang: Lang
}

export type Order = {
    Time:number
    Customer:string
    Content:string
    File:Array<string>
    Color:string
    Material:string
    Status:string
}

export type Orders = Record<number, Order>


export type SelProps ={
    items: Items
    lang: Lang
    name: string
}

export type LoginProps = {
    token: string
    lang: Lang
	name: any
}