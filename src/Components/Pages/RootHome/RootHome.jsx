import { AllUsers } from "../Home/Features/AllUsers/AllUsers"
import { TopEarnUsers } from "../Home/Features/TopEarnUsers/TopEarnUsers"
import { Footer } from "../Home/Footer/Footer"
import { Hero } from "../Home/Hero/Hero"

export const RootHome = () => {
    return (
        <div className="max-w-6xl mx-auto  bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
            <Hero></Hero>
            <TopEarnUsers></TopEarnUsers>
            <AllUsers></AllUsers>
            <Footer></Footer>

        </div>
    )
}
