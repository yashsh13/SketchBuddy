import { BACKEND_URL } from "@repo/common/config";
import axios from "axios";


export async function getExistingShapes(roomId: number){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/room/chats/${roomId}`);

        console.log(response.data.message);

        return response.data.shapes
    }catch (e){
        console.log('Getting existing shapes error: '+e);
    }
}