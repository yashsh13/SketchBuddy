'use client'
import axios from "axios";
import { BACKEND_URL } from "@repo/common/config";
import { useRouter } from "next/navigation";

export default function SideBarOptions(){
    const router = useRouter();

    async function logOutHandler(){
        try{
            const response = await axios.delete(`${BACKEND_URL}/api/v1/user/logout`,
                {withCredentials: true}
            )
            console.log(response.data.message)
            router.push('/login');
        }catch(e){
            console.log("Error in logout request: "+e);
        }
    }

    return (
        <div className="flex flex-col gap-2 items-center mt-10 font-semibold">
            <button className="cursor-pointer underline text-blue-700" onClick={logOutHandler}>Logout</button>
        </div>
    )
}