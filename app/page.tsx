'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Content } from "next/font/google";
import Order from "./components/order";
import Login from "./components/login"
import Swal from "sweetalert2";
import Mc from "@/app/page.module.css"
import {Lang, LangParse} from "@/app/types/types"
import Orders from "./components/orders";




export default function Home() {
	const [token, setToken] = useState("")
	const [lang, setLang] = useState<Lang>("en")
	const [name, setName] = useState("")

	useEffect(()=>{
		setInterval(async ()=>{
			// load data from localStorage
			const localName = localStorage.getItem("name")
			const localToken = localStorage.getItem("token")
			const localLang = localStorage.getItem("lang")
			setToken(localToken != null ? localToken : "")
			setName(localName != null ? localName : "")
			setLang((localLang != null || localLang != "") ? LangParse(localLang) : "en")
			
			localStorage.setItem("token", localToken == null ? "" : localToken)
			localStorage.setItem("name", localName == null ? "" : localName)
			localStorage.setItem("lang", (localLang == null || localLang == "") ? "en" : LangParse(localLang))

			// console.log(localLang, localName, localToken)

		}, 128)
		
	}, [])

  return (
	<div className={Mc.Container}>
		<div className={Mc.Home}>
			<Login token={token} lang={lang} name={name}/>
			<Order token={token} lang={lang}/>
			<Orders token={token} lang={lang}/>
		</div>
	</div>
  );
}
