"use client"

import { useEffect, useState } from "react";
import { Lang, Items, OrdersProps, Orders as TypeOrders, Order as TypeOrder } from "../types/types";
import Mc from "@/app/page.module.css"
import { processEnv } from "@next/env";
import clsx from "clsx";

const Texts:Items = {
    "orders": {
        "en": "Orders",
        "th": "คำสั่งซื้อ"
    }
}

export default function Orders(props:OrdersProps){
    const [getOrders, setOrders] = useState<TypeOrder[]>([])
    useEffect(()=>{
        setInterval(async ()=>{
            let tok = localStorage.getItem("token")
            if (tok != "" ){
                const res = await fetch(process.env.NEXT_PUBLIC_ORDERS_TEST_URI,{
                    method:"GET",
                    headers: {
                        "Authorization": tok?tok:"",
                        "Accept":"application/json",
                    },
                })
                let f = await res.json()
                setOrders([])
                if (f != "NULL") {
                    let newOrders:TypeOrder[] = []
                    for (let i=0;i<(f.length);i++) {
                        let newOrder:TypeOrder ={
                            Time: f[i].Time?f[i].Time:"",
                            Customer: f[i].Customer?f[i].Customer:"",
                            Content: f[i].Content?f[i].Content:"",
                            File: f[i].File?f[i].File:"",
                            Color: f[i].Color?f[i].Color:"",
                            Material: f[i].Material?f[i].Material:"",
                            Status: f[i].Status?f[i].Status:""
                        }
                        await newOrders.push(newOrder)
                    }
                    await setOrders(newOrders)
                }
                
                // console.log(newOrders)
            }
            
        },1000)
    }, [])
    return props.token == "" ? "" :
     (
        <div className={Mc.Card}>
            <h1>{Texts.orders[props.lang]}</h1>
            <div className={Mc.OrdersContainer}>
                {
                getOrders.map((o, i)=>(
                        <div className={clsx(Mc.OrdersList, i%2!=0 && Mc.DarkerBG)} key={i}>
                            
                            <div>{o.Time}</div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div>{o.Status}</div>
                            
                        </div>
                ))
                }
            </div>
        </div>
    )
}