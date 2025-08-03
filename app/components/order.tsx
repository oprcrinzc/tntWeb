'use client'

import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import Mc from "@/app/page.module.css"

import {Items, Lang} from "@/app/types/types"
import Sel from "@/app/components/sel";

type OrderProps = {
    token: string
    lang: Lang
}

const Texts:Items = {
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
    "color": {
        "en": "Colors",
        "th":"สี"
    },
    "material": {
        "en": "Materials",
        "th":"วัสดุ"
    },
    "order":{
        "en":"Order",
        "th":"สั่ง"
    }
}

var ItemsColors: Items ={
    "red":{
        "en":"Red",
        "th":"แดง"
    },
    "green":{
        "en":"Green",
        "th":"เขียว"
    },
    "blue":{
        "en":"Blue",
        "th":"น้ำเงิน"
    },
    "yellow":{
        "en":"Yellow",
        "th":"เหลือง"
    },
    "white":{
        "en":"White",
        "th":"ขาว"
    },
    "black":{
        "en":"Black",
        "th":"ดำ"
    }
}

const ItemsColorsPetg: Items ={
    "yellow":{
        "en":"Yellow",
        "th":"เหลือง"
    },
}
const ItemsColorsPla: Items ={
    "green":{
        "en":"Green",
        "th":"เขียว"
    },
    "white":{
        "en":"White",
        "th":"ขาว"
    }
}
const ItemsEmpty: Items ={

}


const ItemsMaterial: Items = {
    "petg": {
        "en": "petg",
        "th": "petg"
    },
    "pla": {
        "en": "pla",
        "th": "pla"
    }
}

export default function Order(props:OrderProps){

    const [itemColor, setItemColor] = useState<Items>(ItemsEmpty)

    const [file, setFile]= useState<File|null>(null)
    
    const [cnt, setCnt]= useState("")

    const orderHandle = async (e:React.FormEvent) => {
            e.preventDefault()
            
            var localColor = localStorage.getItem("color")            
            var localMaterial = localStorage.getItem("material") 
            if (localColor == null ){
                localColor = ""
            } 
            if (localMaterial == null ){
                localMaterial = ""
            }           
            
            if (localColor == "") {
                await Swal.fire("Please select color !")
                return
            }
            if (localMaterial == "") {
                await Swal.fire("Please select material !")
                return
            }

            var fd = new FormData()
            fd.append("Color", localColor)
            fd.append("Material", localMaterial)
            fd.append('Content', cnt)
            if (file != null) {
                fd.append('File', file)
            } else {
                await Swal.fire("please fill all field");
                return
            }
            // console.log(fd)
            const res = await fetch("http://192.168.88.245:7200/order"/*"https://3d.pluemtnt.com/order"*/, {
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
    useEffect(()=>{
        setInterval(()=>{
            let localMaterial = localStorage.getItem("material")
            if (localMaterial=="petg") {
                setItemColor(ItemsColorsPetg)
            }
            else if (localMaterial=="pla") {
                setItemColor(ItemsColorsPla)
            }
            else {
                setItemColor(ItemsEmpty)
                
            }
        }, 99)
    }, [])
    useEffect(()=>{
        localStorage.setItem("color", "")
        localStorage.setItem("color_seled", "-1")
    }, [itemColor])

    return props.token != "" ? <div className={Mc.Card}>
            <h1>{Texts.order[props.lang]}</h1>
			<form onSubmit={orderHandle}>
				<input type="file" name="file" id="" 
                onChange={(e)=>{setFile(e.target.files?.[0] ?? null)}}/>

                <label htmlFor="order">{Texts.detail[props.lang]}</label>
                
                <div className={Mc.GroupCol}>
                    <div>
                        <div className={Mc.Topic}>
                        <label >{Texts.material[props.lang]}</label>

                        </div>
                        <Sel name="material" items={ItemsMaterial} lang={props.lang}/>
                    </div>
                    <div>
                        <div className={Mc.Topic}>
                            <label>{Texts.color[props.lang]}</label>
                        </div>
                        <Sel name="color" items={itemColor} lang={props.lang}/>
                    </div>
                    
                </div>

				<textarea name="cnt" id="order" placeholder="..."
                onChange={(e)=>{setCnt(e.target.value)}}/>
				
                <input type="submit" value={Texts.send[props.lang]} />
			</form>
            
    </div>:""
}