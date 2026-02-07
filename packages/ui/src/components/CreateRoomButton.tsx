'use client'

import { useAppDispatch } from "@repo/redux/provider";
import { toggle } from "@repo/redux/slices/isVisible";
import Button from "./Button";

export default function CreateRoomButton(){
    const dispatch = useAppDispatch();
    return(
        <Button text={"Create Room"} variant={"primary"} size={'fit'} onClickHandler={()=>dispatch(toggle())}/>
    )
}