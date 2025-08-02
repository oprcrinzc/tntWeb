'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Content } from "next/font/google";
import Order from "./components/order";
import Login from "./components/login"
import Swal from "sweetalert2";
import Mc from "@/app/page.module.css"
import {Lang} from "@/app/types/types"




export default function Home() {
	const [token, setToken] = useState("")
	const [lang, setLang] = useState<Lang>("en")
	const [name, setName] = useState("")

	useEffect(()=>{
		setInterval(()=>{
			const localName = localStorage.getItem("name")
			const localToken = localStorage.getItem("token")
			setToken(localToken != null ? localToken : "")
			setName(localName != null ? localName : "")
			console.log("finding")
		}, 199)
		
	}, [])

  return (
	<div className={Mc.Container}>
		<div className={Mc.Home}>
			<Login token={token} lang={lang} name={name}/>
			<Order token={token} lang={lang}/>
			
		</div>
	</div>
  );
}
