import SearchBar from "./SearchBar";
import Button from "./Button";
import PencilIcon from "../icons/Pencil-Icon";
import Card from "./Card";

export default function DashBoardBody({ onClickHandler }:{
    onClickHandler: ()=>void
}){
    return(
        <div className="absolute top-[10%] left-[20%] p-5 w-[80%]">
            <p className="opacity-33 text-2xl">The sensitivity of a fool is worth more than the clarity of the wise</p>
            <div className="flex items-center gap-10 mt-3">
                <SearchBar />
                <Button text={"Create Room"} variant={"primary"} size={'fit'} onClickHandler={onClickHandler}/>
            </div>
            <div className="p-10 flex flex-wrap gap-5">
                <Card icon={<PencilIcon />} roomName={'Hoban'}/>
                <Card icon={<PencilIcon />} roomName={'Hoban'}/>
                <Card icon={<PencilIcon />} roomName={'Hoban'}/>
                <Card icon={<PencilIcon />} roomName={'Hoban'}/>
                <Card icon={<PencilIcon />} roomName={'Hoban'}/>
                <Card icon={<PencilIcon />} roomName={'Hoban'}/>
                <Card icon={<PencilIcon />} roomName={'Hoban'}/>
            </div>
        </div>
    )
}