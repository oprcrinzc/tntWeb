'use client'

import { useState } from "react"
import Swal from "sweetalert2"
import Mc from "@/app/page.module.css"

type OrderPeops = {
    token: string
    lang: string
}

const Texts = {
    "chooseFile": {
        "en": "Choose File",
        "th": "เลือกไฟล์"
    },
    "detail": {
        "en": "Details",
        "th": "รายละเอียด"
    },
    "send": {
        "en": "Send",
        "th": "ส่ง"
    },
}

export default function Order(props:OrderPeops){
    
    if (props.lang == null) {
        props.lang = "en"
    }

    const [file, setFile]= useState<File|null>(null)
    
    const [cnt, setCnt]= useState("")

    const orderHandle = async (e:React.FormEvent) => {
            e.preventDefault()
            
            var fd = new FormData()
            fd.append('Content', cnt)
            if (file != null) {
                fd.append('File', file)
            } else {
                await Swal.fire("please fill all field");
                return
            }
            // console.log(fd)
            const res = await fetch("https://3d.pluemtnt.com/order", {
                method: "POST",
                headers: {
                    // "Content-Type":"application/json",
                    "Authorization":props.token
                },
                body: fd
            })

            if (!res.ok) throw new Error("server error")
            const data = await res.json()
            console.log(data)
            await Swal.fire({
                "title": "Info",
                "text": data,
            })
    
        }

    return props.token != "" ? <div className={Mc.Card}>
            <h1>Order</h1>
			<form onSubmit={orderHandle}>
				<input type="file" name="file" id="" 
                onChange={(e)=>{setFile(e.target.files?.[0] ?? null)}}/>

                <label htmlFor="order">{Texts['detail'][props.lang]}</label>

				<textarea name="cnt" id="order" placeholder="..."
                onChange={(e)=>{setCnt(e.target.value)}}/>
				
                <input type="submit" value="Send" />
			</form>
            
    </div>:""
}