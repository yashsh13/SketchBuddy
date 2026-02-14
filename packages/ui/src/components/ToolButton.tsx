import { ReactElement } from "react"


export default function ToolButton({ icon, selected, onClickHandler }:{
    icon: ReactElement,
    selected: boolean,
    onClickHandler: ()=>void
}){
    return(
        <button onClick={onClickHandler} className={"border-1 border-dark-cream rounded-md p-1 text-dark-cream cursor-pointer hover:bg-gray-200 "+(selected?'bg-gray-200':'bg-white')} >
            {icon}
        </button>
    )
}