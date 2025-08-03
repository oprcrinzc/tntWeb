'use client'
import clsx from "clsx";
import { Lang, Items, SelProps } from "../types/types";
import Mc from "@/app/page.module.css"
import { useEffect, useState } from "react";



export default function Sel(props:SelProps){
    const [seled, SetSeled] = useState(-1)
    const handle = (i:number, k:string) =>{
            // console.log(seled)
        SetSeled(i)
        localStorage.setItem(props.name, k)
        localStorage.setItem(props.name+"_seled", i.toString())
    }
    useEffect(()=>{
        localStorage.setItem(props.name, "")
        localStorage.setItem(props.name+"_seled", (-1).toString())
        setInterval(()=>{
            let localSeled = localStorage.getItem(props.name+"_seled")
            SetSeled(isNaN(Number(localSeled)) ? -1 : Number(localSeled))
            // console.log(Number(localSeled))
        },99)
    },[])

    return props.items == null ? "" : 
    Object.entries(props.items).map(([key, value], index)=>{
        return <div key={key} className={Mc.Sel}>
            <p onClick={()=>{handle(index, key)}} 
                className={
                    clsx(
                        index%2==0 && Mc.SelDark, 
                        index%2!=0 && Mc.SelBright,
                        index==seled && Mc.Seled
                    )
                }>
                {value[props.lang]}</p>
        </div>
    })
            
        
}