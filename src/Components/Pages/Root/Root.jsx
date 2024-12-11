import { Outlet } from "react-router-dom"
import { NavBar } from "../Home/Header/Navbar/Navbar"


export const Root = () => {
    return (
        <div className="max-w-6xl mx-auto ">
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    )
}
