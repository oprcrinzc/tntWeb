import { Lang, Items, OrdersProps } from "../types/types";
import Mc from "@/app/page.module.css"

const Texts:Items = {
    "orders": {
        "en": "Orders",
        "th": "คำสั่งซื้อ"
    }
}

export default function Orders(props:OrdersProps){
    return props.token == "" ? "" :
     (
        <div className={Mc.Card}>
            <h1>{Texts.orders[props.lang]}</h1>
            <div className={Mc.Container}></div>
        </div>
    )
}