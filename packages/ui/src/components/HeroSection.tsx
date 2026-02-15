'use client'

import Button from "./Button";
import { useRouter } from "next/navigation";

export default function HeroSection(){
    const router = useRouter();

    return(
        <div className=" bg-linear-to-b from-cream to-white flex flex-col gap-5 justify-center items-center h-128">
            <p className="text-6xl font-cartoon text-dark-cream animate-bounce font-bold">SketchBuddy</p>
            <p className="text-2xl">A real-time colaborative drawing platform</p>
            <div className="flex gap-5">
                <Button text={"Start Drawing"} variant={"primary"} size={"fit"} onClickHandler={()=>router.push('/login')}/>
                <Button text={"Signup"} variant={"secondary"} size={"fit"} onClickHandler={()=>router.push('/signup')}/>
            </div>
        </div>
    )
}