'use client'

import CrossIcon from "../icons/CrossIcon";
import InputField from "./InputField";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "@repo/redux/provider";
import { toggle } from "@repo/redux/slices/isVisible";

export default function CreateRoomForm(){
    const isVisible = useAppSelector(state => state.isVisible.value);
    const dispatch = useAppDispatch();

    return(
        <>
        {isVisible &&
            <div className="h-screen w-screen fixed bg-gray-500/50 z-2 flex justify-center items-center">
                <div className="bg-white w-xs p-5 rounded-md">
                    <div className="flex justify-between items-center mb-10">
                        <p className="text-xl">Create Room</p>
                        <CrossIcon onClose={()=>dispatch(toggle())}/>
                    </div>
                    <div className="flex flex-col gap-6">
                        <InputField placeholder={"Room Name"} />
                        <Button variant={"primary"} text={"Create"} size={"full"}/>
                    </div>
                </div>
            </div>}
        </>
    )
}