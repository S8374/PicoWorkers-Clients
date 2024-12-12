import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { UseAuth } from "../../../../Hooks/useAuth";
import { useState } from "react";
import { UseAxiosPublic } from "../../../../Hooks/useAxiosPublic";
import { Button } from "@nextui-org/button";

export const SocialLogin = ({ onSuccess }) => {
    const { googleSignIn } = UseAuth();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [coins, setCoins] = useState(0);
    const axiosPublic = UseAxiosPublic();

    // Sign in with Google
    const handleGoogleSignIn = async () => {
        try {
            const result = await googleSignIn();
            console.log(result.user);

            // User Info
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                photoUrl: result.user?.photoURL,
                userCategory: 'Worker',
                coins: 10,
            };

            // Post user info to backend
            const response = await axiosPublic.post('/users', userInfo);
            if (response.status === 200) {
                console.log("User details saved successfully:", response.data);
                Swal.fire({
                    title: "Logged In Successfully!",
                    text: "Your details have been saved.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong while saving your details.",
                });
            }
        } catch (error) {
            console.error("Error during Google sign-in or saving user data:", error);
            Swal.fire({
                icon: "success",
                title: "Login Confirm",
               
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div>
            <Button
                className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-300"
                variant="outline"
                onClick={handleGoogleSignIn}
                aria-hidden={false}
            >
                <FcGoogle size={24} /> Sign in with Google
            </Button>

            {selectedCategory && (
                <div className="mt-4">
                    <p className="text-center">Selected Category: {selectedCategory}</p>
                    <p className="text-center">You have earned {coins} coins!</p>
                </div>
            )}
        </div>
    );
};
