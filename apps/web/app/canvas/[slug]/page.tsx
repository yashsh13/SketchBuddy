import { BACKEND_URL } from "@repo/common/config";
import WSConnect from "@repo/ui/components/WSConnect";
import axios from "axios";
import { cookies } from "next/headers";

export default async function Canvas({ params }:{
    params:{
        slug: string
    }
}){
    try{
        const cookieStore = await cookies();
        const slug = (await params).slug;
    
        const response = await axios.get(`${BACKEND_URL}/api/v1/room/id/${slug}`,
            {headers:{
                cookie: cookieStore.toString()
            }}
        );

        console.log(response.data.message);
        const roomId = response.data.roomId;

        return(
            <div>
                <WSConnect roomId={roomId} />
            </div>
        )
    }catch (e){
        console.log("Error in getting room id: "+e)

        return(
            <div>
                Connection Failed
            </div>
        )
    }

}