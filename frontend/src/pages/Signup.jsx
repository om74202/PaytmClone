import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

export const Signup=()=>{
    const [firstName,setFirstName]=useState("");
    const [LastName,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    return <div className="bg-slate-800 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <Heading label={"Sign Up "}/>
        <SubHeading label={"Enter your information to open an account"}/>

        <InputBox onChange={(e)=>{
            setFirstName(e.target.value);
        }} label={"First Name"} placeholder={"your name"}/>

        <InputBox onChange={(e)=>{
            setLastName(e.target.value);
        }} label={"Last Name"} placeholder={"your last  name"}/>

        <InputBox onChange={(e)=>{
            setUsername(e.target.value);
        }} label={"Email"} placeholder={"xyz@gmail.com"}/>

        <InputBox onChange={(e)=>{
            setPassword(e.target.value);
        }} label={"Password"} placeholder={"..........."}/>

        <Button onClick={async ()=>{
            const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                password,
                first_name:firstName,
                last_name:LastName,
            });
            localStorage.setItem("token",response.data.token);
        }} label={"Sign Up"}/>
        <BottomWarning label={"Have an account already?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
        
    </div>
}