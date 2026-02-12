import { ReactElement } from "react"
import { useRouter } from "next/navigation";

interface CardProps{
    icon: ReactElement,
    roomName: string
}

export default function Card({ icon, roomName}: CardProps){
    const router = useRouter();

    return(
        <button onClick={()=>router.push('/canvas/'+roomName)} className="w-3xs h-40 text-dark-cream shadow-lg cursor-pointer relative bottom-0 transition-[bottom] hover:bottom-2">
            <div className="h-[80%] flex justify-center items-center rounded-t-md border">
                {icon}
            </div>
            <div className="h-[20%] flex items-center p-4 bg-cream rounded-b-md border-l border-r border-b">
                {roomName}
            </div>
        </button>
    )
}