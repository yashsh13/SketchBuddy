import axios from "axios";
import UserIcon from "../icons/UserIcon";
import { BACKEND_URL } from "@repo/common/config";
import SideBarOptions from './SideBarOptions';
import { cookies } from 'next/headers';
import LogInRedirect from "./LogInRedirect";

export default async function SideBar(){

    try{
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
                <SideBarOptions />
            </div>
        )
    }catch (e){
        return <LogInRedirect />
    }

}