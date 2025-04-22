import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import backgroundImage from '../assets/backgroundImage.jpg'
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex h-screen">
            <div
                className="w-1/6 h-full relative"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-25 z-0"></div>
                <div className="relative z-10 h-full">
                    <SideNav />
                </div>
            </div>


            <div className="flex-1 flex flex-col">
                <div className="h-16 bg-slate-50 shadow-md shadow-black text-white p-3">
                    <TopNav />
                </div>

                <div className="flex-1 p-4 bg-blue-50">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
