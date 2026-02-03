import { ReactElement } from "react"

interface InputFieldProps{
    placeholder: string,
    icon?: ReactElement,
    reference?: any
}

export default function InputField({ placeholder, icon, reference }: InputFieldProps){
    return(
        <div className="flex gap-2 items-center justify-start py-3">
            {icon}
            <input type={"text"} placeholder={placeholder} ref={reference} className="border-b focus:outline-none w-full text-md"/>
        </div>
    )
} 