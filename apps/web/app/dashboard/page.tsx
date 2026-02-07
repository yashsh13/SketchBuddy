import Header from "@repo/ui/components/Header";
import SideBar from "@repo/ui/components/SideBar";
import DashBoardBody from "@repo/ui/components/DashBoardBody";
import CreateRoomForm from "@repo/ui/components/CreateRoomForm";

export default function DashBoard(){

    return(
        <>
            <CreateRoomForm />
            <div className="h-screen">
                <Header />
                <SideBar />
                <DashBoardBody />
            </div>
        </>
    )
}