import { BACKEND_URL } from "@repo/common/config";
import WSConnect from "@repo/ui/components/WSConnect";
import axios from "axios";

export default async function Canvas({ params }:{
    params:{
        slug: string
    }
}){

    const slug = (await params).slug;
    
    const response = await axios.get(`${BACKEND_URL}/api/v1/room/${slug}`);
    const roomId = response.data.roomId;
    
    return(
        <div>
            <WSConnect roomId={roomId} />
        </div>
    )
}