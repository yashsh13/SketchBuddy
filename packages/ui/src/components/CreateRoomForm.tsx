import CrossIcon from "../icons/CrossIcon";
import InputField from "./InputField";
import Button from "./Button";

export default function CreateRoomForm({ onClose }:{
    onClose:()=>void
}){
    return(
        <div className="h-screen w-screen fixed bg-gray-500/50 z-2 flex justify-center items-center">
            <div className="bg-white w-xs p-5 rounded-md">
                <div className="flex justify-between items-center mb-10">
                    <p className="text-xl">Create Room</p>
                    <CrossIcon onClose={onClose}/>
                </div>
                <div className="flex flex-col gap-6">
                    <InputField placeholder={"Room Name"} />
                    <Button variant={"primary"} text={"Create"} size={"full"}/>
                </div>
            </div>
        </div>
    )
}