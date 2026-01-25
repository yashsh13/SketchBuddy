import { ReactElement } from "react"

interface InputFieldProps{
    placeholder: string,
    icon?: ReactElement
}

export default function InputField({ placeholder, icon }: InputFieldProps){
    return(
        <div className="flex gap-2 items-center justify-start">
            {icon}
            <input type={"text"} placeholder={placeholder} className="border-b focus:outline-none w-full text-lg"/>
        </div>
    )
} 