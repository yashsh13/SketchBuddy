import PencilIcon from "../icons/Pencil-Icon";

export default function Header(){
    return(
        <div className="fixed top-0 bg-cream flex items-center justify-between px-5 h-[10%] w-full z-1">
            <div className="flex gap-4 text-dark-cream">
                <PencilIcon />
                <p className="font-cartoon text-3xl font-bold">SketchBuddy</p>
            </div>
            <div className="flex text-dark-cream gap-10">
                <p className="cursor-pointer">Home</p>
                <p className="cursor-pointer">About</p>
                <p className="cursor-pointer">Contact Us</p>
            </div>
        </div>
    )
}