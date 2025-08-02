'use client'
import clsx from "clsx";
import { Lang, Items } from "../types/types";
import Mc from "@/app/page.module.css"
import { useState } from "react";

type SelProps ={
    items: Items
    lang: Lang
}

export default function Sel(props:SelProps){
    const [seled, SetSeled] = useState(0)
    return (<div>
        {
            props.items == null ? "" : 
            Object.entries(props.items).map(([key, value], index)=>{
                return <div key={key} className={Mc.Sel}>
                    <p className={clsx(index%2==0 && Mc.SelDark, index%2!=0 && Mc.SelBright)}>{value[props.lang]}</p>
                </div>
            })
        }
    </div>)
}