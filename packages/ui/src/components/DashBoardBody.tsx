'use client'

import SearchBar from "./SearchBar";
import PencilIcon from "../icons/Pencil-Icon";
import Card from "./Card";
import axios from "axios";
import { BACKEND_URL } from "@repo/common/config";
import CreateRoomButton from "./CreateRoomButton";
import { useEffect, useRef, useState } from "react";

interface RoomInterface {
    id: number;
    slug: string;
    adminid: number;
    createdAt: Date;
}

export default function DashBoardBody(){

    const [rooms,setRooms] = useState<RoomInterface []>([]);
    const searchRef = useRef<HTMLInputElement>(null);

    async function getRooms(){
        try{
            if(searchRef.current?.value == ""){
                const response = await axios.get(`${BACKEND_URL}/api/v1/room/all`,
                    {withCredentials: true}
                )
                if(response.status == 200){
                    setRooms(response.data.rooms);
                }
            } else {
                const response = await axios.get(`${BACKEND_URL}/api/v1/room/search/`+searchRef.current?.value,
                    {withCredentials: true}
                )
                if(response.status == 200){
                    setRooms(response.data.rooms);
                }
            }
        }catch(e){
            console.log("Fetching or Searching rooms error: "+e);
        }
    }

    useEffect(()=>{
        getRooms();
    },[])
 
    return(
        <div className="absolute top-[10%] left-[20%] p-5 w-[80%]">
            <p className="opacity-33 text-2xl">The sensitivity of a fool is worth more than the clarity of the wise</p>
            <div className="flex items-center gap-10 mt-3">
                <SearchBar reference={searchRef} onChangeHandler={getRooms}/>
                <CreateRoomButton />
            </div>
            <div className="p-10 flex flex-wrap gap-5">
                {rooms?.map(room => <Card key={room.id} icon={<PencilIcon />} roomName={room.slug}/>)}
            </div>
        </div>
    )
}