'use client'

import Header from "@repo/ui/components/Header";
import SideBar from "@repo/ui/components/SideBar";
import DashBoardBody from "@repo/ui/components/DashBoardBody";
import CreateRoomForm from "@repo/ui/components/CreateRoomForm";
import { useState } from "react";

export default function DashBoard(){
    const [isVisible,setIsVisible] = useState(false);

    return(
        <>
            {isVisible && <CreateRoomForm onClose={()=>setIsVisible(false)} />}
            <div className="h-screen">
                <Header />
                <SideBar />
                <DashBoardBody onClickHandler={()=>setIsVisible(true)}/>
            </div>
        </>
    )
}