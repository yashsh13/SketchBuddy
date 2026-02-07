import SearchBar from "./SearchBar";
import PencilIcon from "../icons/Pencil-Icon";
import Card from "./Card";
import axios from "axios";
import { BACKEND_URL } from "@repo/common/config";
import CreateRoomButton from "./CreateRoomButton";
import { cookies } from "next/headers";

interface RoomInterface {
    id: number;
    slug: string;
    adminid: number;
    createdAt: Date;
}

export default async function DashBoardBody(){

    const cookieStore = await cookies(); 

    const response = await axios.get(`${BACKEND_URL}/api/v1/room/all`,
        {headers: {
            cookie: cookieStore.toString()
        }}
    )

    console.log(response.data.message);
 
    return(
        <div className="absolute top-[10%] left-[20%] p-5 w-[80%]">
            <p className="opacity-33 text-2xl">The sensitivity of a fool is worth more than the clarity of the wise</p>
            <div className="flex items-center gap-10 mt-3">
                <SearchBar />
                <CreateRoomButton />
            </div>
            <div className="p-10 flex flex-wrap gap-5">
                {(response.data.rooms as RoomInterface[])?.map(room => <Card key={room.id} icon={<PencilIcon />} roomName={room.slug}/>)}
            </div>
        </div>
    )
}