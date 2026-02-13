'use client'

import CrossIcon from "../icons/CrossIcon";
import InputField from "./InputField";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "@repo/redux/provider";
import { toggle } from "@repo/redux/slices/isVisible";
import axios from "axios";
import { BACKEND_URL } from "@repo/common/config";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRoomForm(){
    const isVisible = useAppSelector(state => state.isVisible.value);
    const dispatch = useAppDispatch();
    const createRoomRef = useRef<HTMLInputElement>(null);
    const [message,setMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const router = useRouter();

    async function createRoom(){
        try{
            if(!createRoomRef.current?.value){
                setMessage('This field can\'t be empty');
                return
            }
            setLoading(true);
            setMessage('');
            const response = await axios.post(`${BACKEND_URL}/api/v1/room/create`,
                {slug: createRoomRef.current?.value},
                {
                    withCredentials: true,
                    validateStatus: status => status >= 200 && status <= 500
                }
            )

            if(response.status == 200){
                dispatch(toggle());
                router.push('/canvas/'+createRoomRef.current?.value);
            } else {
                setMessage(response.data.message);
            }
            setLoading(false);
        }catch(e){
            console.log("Creating Room error: "+e);
        }
    }

    return(
        <>
        {isVisible &&
            <div className="h-screen w-screen fixed bg-gray-500/50 z-2 flex justify-center items-center">
                <div className="bg-white w-xs p-5 rounded-md">
                    <div className="flex justify-between items-center mb-10">
                        <p className="text-xl">Create Room</p>
                        <CrossIcon onClose={()=>{
                            dispatch(toggle()); 
                            setMessage('')
                            }}/>
                    </div>
                    <div className="flex flex-col gap-6">
                        <InputField placeholder={"Room Name"} reference={createRoomRef}/>
                        {!loading&&<Button variant={"primary"} text={"Create"} size={"full"} onClickHandler={createRoom}/>}
                        {loading&&<p className="text-center">Loading . . .</p>}
                        {message&&<p className="text-center text-red-500">{message}</p>}
                    </div>
                </div>
            </div>}
        </>
    )
}