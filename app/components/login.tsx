'use client'

import { useState } from "react"
import Swal from "sweetalert2"
import Mc from "@/app/page.module.css"
import clsx from "clsx"

type OrderPeops = {
    token: string
    lang: string
}

const Texts = {
    "name": {
        "en": "name",
        "th": "ชื่อ"
    },
    "password": {
        "en": "password",
        "th": "รหัสผ่าน"
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

    const [token, setToken] = useState("")
        const [name, setName] = useState("")
        const [pwd, setPwd] = useState("")
        
    const handle = async (e:React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await fetch("https://3d.pluemtnt.com/login", {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify({
					Name: name,
					Password: pwd,
				})
			})

			if (!res.ok) throw new Error("server error")
			const data = await res.json()
		localStorage.setItem("token", data)
			setToken(data)

		} catch(err) {
			console.log(err)
			setToken("")
		}
	}
    
    return (<div >
        { token == "" ? <div className={clsx(Mc.Card, Mc.Login)}><h1>Login</h1>
		<form onSubmit={handle}>
			<label htmlFor="name">{Texts.name[props.lang]}</label>
			<input type="text" name="" id="name" 
			onChange={(e)=>{
				setName(e.target.value)
			}}/>
			<label htmlFor="password">{Texts.password[props.lang]}</label>

			<input type="password" name="" id="password" 
			onChange={(e)=>{
				setPwd(e.target.value)
			}}/>
			<input type="submit" value={Texts.send[props.lang]} />
		</form></div> : ""
		}
		<h1>{token}</h1>
    </div>)
}