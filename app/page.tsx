'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Content } from "next/font/google";
import Order from "./components/order";
import Login from "./components/login"
import Swal from "sweetalert2";
import Mc from "@/app/page.module.css"


export default function Home() {
	const [token, setToken] = useState("")

	const [lang, setLang] = useState("en")

	useEffect(()=>{
		setInterval(()=>{
			const localToken = localStorage.getItem("token")
			if (localToken!= null)  {
				setToken(localToken)
			} else {
				setToken("")
			}
			console.log("finding")
		}, 200)
		
	}, [])

  return (
	<div className={Mc.Container}>
		<div className={Mc.Home}>
			<Login token={token} lang={lang}/>
			<Order token={token} lang={lang}/>
		</div>
	</div>
  );
}
