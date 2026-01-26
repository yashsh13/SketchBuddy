import InputField from "./InputField";
import UserIcon from "../icons/UserIcon";
import MailIcon from "../icons/Mail-Icon";
import KeyIcon from "../icons/KeyIcon";
import Button from "./Button";

export default function AuthForm({ type }:{ type: string }){
    return(
        <div className="bg-white w-[50%] flex flex-col items-center justify-between rounded-xl py-5 px-3 shadow-2xl">
            <p className="text-dark-cream font-bold text-2xl">{type=='signup'?'SignUp':'Login'}</p>
            <div className="flex flex-col w-full py-5 px-3">
                <InputField placeholder={"Username"} icon={<UserIcon />} />
                {(type=='signup')&&<InputField placeholder={"Email"} icon={<MailIcon />} />}
                <InputField placeholder={"Password"} icon={<KeyIcon />} />
            </div>
            <div className="w-full px-3">
                <Button text={"Submit"} variant={"primary"} size={"full"} />
            </div>
        </div>  
    )
}