'use client'
import Image from "next/image";
import { QrProps } from "../types/types";
import { useEffect, useState } from "react";
import Mc from "@/app/page.module.css"

export default function Qr(props:QrProps) {
    const [isShow, setShow] = useState(false)
    const toggle =()=>{
        setShow(!isShow)
    }
    return props.token != "" ?(<div>
        {
            isShow ? <div><Image
            src = {process.env.NEXT_PUBLIC_qrpay+"/"+props.id+"/" +props.token}
            width={600}
            height={600}
            alt="qr promptpay"
        /><div onClick={toggle} className={Mc.button}>Close</div></div> : <div onClick={toggle} className={Mc.button}>QR</div>
        }
        
    </div>): ""
}