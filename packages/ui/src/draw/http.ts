import { BACKEND_URL } from "@repo/common/config";
import axios from "axios";


export async function getExistingShapes(roomId: number){
    try{
        const response = await axios.get(`${BACKEND_URL}/api/v1/chat/${roomId}`,
            {withCredentials: true}
        );

        console.log(response.data.message);

        return response.data.shapes
    }catch (e){
        console.log('Getting existing shapes error: '+e);
    }
}

export async function deleteExistingShapes(roomId: number){
    try{
        const response = await axios.delete(`${BACKEND_URL}/api/v1/chat/${roomId}`,
            {withCredentials: true}
        );

        console.log("Succesfully deleted the chats");
    }catch(e){
        return console.log("Error in deleting message: "+e);
    }
}