'use client'

import { useState } from "react"
import Swal from "sweetalert2"
import Mc from "@/app/page.module.css"
import clsx from "clsx"

import {Items, Lang, LoginProps} from "@/app/types/types"
import Sel from "./sel"

import dotenv from "dotenv"


const Texts:Items = {
    "name": {
        "en": "name",
        "th": "ชื่อ"
    },
    "password": {
        "en": "password",
        "th": "รหัสผ่าน"
    },
	"email": {
        "en": "email",
        "th": "จดหมายอิเล็กทรอนิกส์"
    },
    "send": {
        "en": "Send",
        "th": "ส่ง"
    },
	"exit": {
		"en":"Exit",
		"th":"ออก"
	},
	"welcome": {
		"en":"Welcome",
		"th":"ยินดีต้อนรับ"
	},
	"login": {
		"en":"Login",
		"th":"เข้าสู่ระบบ"
	},
	"register": {
		"en":"Register",
		"th":"ลงทะเบียน"
	}
}

const LangItems :Items = {
	"en":{
		"en":"eng",
		"th":"อังกิด"
	},
	"th":{
		"en":"thai",
		"th":"ไทย"
	},			
}

export default function Order(props:LoginProps){
	// const login_uri = process.env.NEXT_PUBLIC_LOGIN_TEST_URI
	// console.log(login_uri)

	const [name, setName] = useState("")
	const [pwd, setPwd] = useState("")

	const [regName, setRegName] = useState("")
	const [regPwd, setRegPwd] = useState("")
	const [regEmail, setRegEmail] = useState("")
    
	const ExitHandle = async () => {
		console.log("Exittt")
		localStorage.clear()
	}

    const handle = async (e:React.FormEvent) => {
		e.preventDefault()
		// console.log(process.env.NEXT_PUBLIC_LOGIN_TEST_URI)
		try {
			const res = await fetch(/*"https://3d.pluemtnt.com/login"*/ process.env.NEXT_PUBLIC_LOGIN_URI , {
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
		localStorage.setItem("name", name)

		} catch(err) {
			console.log(err)
		}
	}

	const handleReg = async (e:React.FormEvent) => {
		e.preventDefault()
		// console.log(process.env.NEXT_PUBLIC_LOGIN_TEST_URI)
		try {
			const res = await fetch(/*"https://3d.pluemtnt.com/login"*/ process.env.NEXT_PUBLIC_REGISTER_URI , {
				method: "POST",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify({
					Name: regName,
					Password: regPwd,
					Email: regEmail,
				})
			})

			if (!res.ok) throw new Error("server error")
			const data = await res.json()
			Swal.fire("Success\nLEt login")

		// localStorage.setItem("token", data)
		// localStorage.setItem("name", name)

		} catch(err) {
			console.log(err)
		}
	}
    
    return props.token == "" ? <div className={clsx(Mc.Card, Mc.Login)}><h1>{Texts.login[props.lang]}</h1>
		<form onSubmit={handle}>
			<label htmlFor="name">{Texts.name[props.lang]}</label>
			<input type="text" name="" id="name" 
			onChange={(e)=>{
				setName(e.target.value)
			}}/>
			<label htmlFor="password">{Texts.password[props.lang]}</label>

			<input type="password" name="" id="password" onChange={(e)=>{setPwd(e.target.value)}}/>
	
			<input type="submit" value={Texts.send[props.lang] || ""} />
		</form><h1>{Texts.register[props.lang]}</h1> <form onSubmit={handleReg}>
			<label htmlFor="name">{Texts.name[props.lang]}</label>
			<input type="text" name="" id="name" 
			onChange={(e)=>{
				setRegName(e.target.value)
			}}/>
			<label htmlFor="password">{Texts.password[props.lang]}</label>

			<input type="password" name="" id="password" onChange={(e)=>{setRegPwd(e.target.value)}}/>
			<label htmlFor="email">{Texts.email[props.lang]}</label>
			<input type="email" name="" id="email" onChange={(e)=>{setRegEmail(e.target.value)}}/>
	
			<input type="submit" value={Texts.send[props.lang] || ""} />
		</form></div> : <div className={clsx(Mc.Card, Mc.Welcome)}>
			<h1>{Texts.welcome[props.lang]}</h1>
			<h1 className={Mc.Darker}>[{props.name}]</h1>
			<div className={Mc.Container}>
				<Sel name="lang" lang={props.lang} items={LangItems}/>
			</div>
			<p className={Mc.Exit} onClick={ExitHandle}>{Texts.exit[props.lang]}</p>
		</div>
		

}