'use client'

import { useState } from "react"
import Swal from "sweetalert2"

type OrderPeops = {
    token: string
}

export default function Order(props:OrderPeops){
    
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
    return (<div>
            <h1>Order</h1>
			<form onSubmit={orderHandle}>
				<input type="file" name="file" id="" 
                onChange={(e)=>{setFile(e.target.files?.[0] ?? null)}}/>
				<input type="text" name="cnt" id="" placeholder="order" 
				onChange={(e)=>{setCnt(e.target.value)}}/>
				<input type="submit" value="Send" />
			</form>
            
    </div>)
}