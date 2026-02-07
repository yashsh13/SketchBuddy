import axios from "axios";
import UserIcon from "../icons/UserIcon";
import { BACKEND_URL } from "@repo/common/config";
import { cookies } from 'next/headers';

export default async function SideBar(){

    const cookieStore = await cookies();

    const response = await axios.get(`${BACKEND_URL}/api/v1/user/name`,
        {
            headers: {
            Cookie: cookieStore.toString(),
        }}
    );
    console.log(response.data.message);

    return(
        <div className="bg-[#FCFCFC] fixed top-[10%] h-full w-[20%] z-1">
            <div className="flex justify-center items-center gap-4 mt-10">
                <UserIcon />
                <p className="font-bold text-xl">{response.data.username}</p>
            </div>
            <div className="flex flex-col gap-2 items-center mt-10 font-semibold">
                <p className="cursor-pointer">Edit Profile</p>
                <p className="cursor-pointer">Rooms</p>
                <p className="cursor-pointer">Join</p>
                <p className="cursor-pointer">Settings</p>
            </div>
        </div>
    )
}