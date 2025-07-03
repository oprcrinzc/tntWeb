'use client'
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Content } from "next/font/google";
import Order from "./components/order";
import Swal from "sweetalert2";

export default function Home() {
	const [token, setToken] = useState("")
	const [name, setName] = useState("")
	const [pwd, setPwd] = useState("")
	

	const handle = async (e:React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await fetch("http://127.0.0.1:7200/login", {
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

	

	useEffect(()=>{
		const localToken = localStorage.getItem("token")
		if (localToken!= null)  {
			setToken(localToken)
		}
	}, [])

  return (
	<div>
		{ token == "" ? <div><p>Login</p>
		<form onSubmit={handle}>
			<input type="text" name="" id="" 
			onChange={(e)=>{
				setName(e.target.value)
			}}/>
			<input type="password" name="" id="" 
			onChange={(e)=>{
				setPwd(e.target.value)
			}}/>
			<input type="submit" value="" />
		</form></div> : ""
		}
		<h1>{token}</h1>
		<Order token={token}/>
   	</div>
  );
}
