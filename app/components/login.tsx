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

	const [name, setName] = useState("")
	const [pwd, setPwd] = useState("")
    
	const ExitHandle = async () => {
		console.log("Exittt")
		localStorage.removeItem("token")
	}
    const handle = async (e:React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await fetch(/*"https://3d.pluemtnt.com/login"*/ "http://192.168.88.245:7200/login", {
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

		} catch(err) {
			console.log(err)
		}
	}
    
    return props.token == "" ? <div className={clsx(Mc.Card, Mc.Login)}><h1>Login</h1>
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
		</form></div> : <div className={clsx(Mc.Card, Mc.Welcome)}>
			<h1>Welcome</h1>
			<h1 className={Mc.Darker}>[{name}]</h1>
			<p onClick={ExitHandle}>Exit</p>
		</div>
		

}