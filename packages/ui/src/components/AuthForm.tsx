'use client';

import { useEffect, useRef, useState } from "react";
import InputField from "./InputField";
import UserIcon from "../icons/UserIcon";
import MailIcon from "../icons/Mail-Icon";
import KeyIcon from "../icons/KeyIcon";
import Button from "./Button";
import axios from "axios";
import { BACKEND_URL } from "@repo/common/config";
import { useRouter } from "next/navigation";


export default function AuthForm({ type }:{ type: string }){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [loading,setLoading] = useState(false);
    const [message,setMessage] = useState<string>();

    useEffect(()=>{
        const token = document.cookie.split(';').slice(-1)[0];
        if(token?.includes('token')){
            router.push('/dashboard');
        }
    },[]);

    async function signUpHandler(){
        try{
            if(!usernameRef.current?.value || !passwordRef.current?.value || !emailRef.current?.value){
                setMessage("Must fill all fields");
                return
            }
            setLoading(true);
            setMessage('');
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,
                {
                    username: usernameRef.current?.value,
                    password: passwordRef.current?.value,
                    email: emailRef.current?.value
                },
                {
                    validateStatus: status => status >= 200 && status <= 500
                }
            )
            
            if(response.status == 200){
                setMessage('');
                router.push('/login');
            } else {
                setMessage(response.data.message);
            }
            setLoading(false);
        } catch(e){
            console.log('Signup request error: '+e);
        }
    }  
    
    async function logInHandler(){
        try{
            if(!usernameRef.current?.value || !passwordRef.current?.value){
                setMessage("Must fill all fields");
                return
            }
            setLoading(true);
            setMessage('');
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/login`,
                {
                    username: usernameRef.current?.value,
                    password: passwordRef.current?.value
                },
                {
                    withCredentials: true,
                    validateStatus: status => status >= 200 && status <= 500
                }
            )

            if(response.status == 200){
                setMessage('');
                router.push('/dashboard');
            } else {
                setMessage(response.data.message);
            }
            setLoading(false);

        } catch(e){
            console.log('LogIn request error: '+e);
        }
    }   

    return(
        <div className="bg-white w-[50%] flex flex-col items-center justify-between rounded-xl py-5 px-3 shadow-2xl">
            <p className="text-dark-cream font-bold text-2xl">{type=='signup'?'SignUp':'Login'}</p>
            <div className="flex flex-col w-full py-5 px-3">
                <InputField placeholder={"Username"} icon={<UserIcon />} reference={usernameRef}/>
                {(type=='signup')&&<InputField placeholder={"Email"} icon={<MailIcon />} reference={emailRef}/>}
                <InputField placeholder={"Password"} icon={<KeyIcon />} reference={passwordRef}/>
            </div>
            <div className="w-full px-3">
                {!loading&&<Button text={"Submit"} variant={"primary"} size={"full"} onClickHandler={(type=='signup')?signUpHandler:logInHandler} disabledState={loading} />}
                {loading&&<p className="text-center">Loading . . .</p>}
                {message&&<p className="text-center text-red-500 mt-2">{message}</p>}
            </div>
        </div>  
    )
}