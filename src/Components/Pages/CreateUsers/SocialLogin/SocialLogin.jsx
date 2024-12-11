import { Button } from "@nextui-org/button";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { UseAuth } from "../../../../Hooks/useAuth";
import { useState } from "react";
import { UseAxiosPublic } from "../../../../Hooks/useAxiosPublic"; // Assuming you have this hook for making public API requests

export const SocialLogin = ({ onSuccess }) => {
    const { googleSignIn } = UseAuth();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [coins, setCoins] = useState(0);
    const axiosPublic = UseAxiosPublic(); // Axios instance for API requests

    const handleCategorySelection = (category) => {
        setSelectedCategory(category);

        // Assign coins based on the selected category
        let calculatedCoins = 0;
        if (category === "Worker") {
            calculatedCoins = 10;
        } else if (category === "TaskCreator") {
            calculatedCoins = 50;
        }

        setCoins(calculatedCoins);

        // Optionally, trigger the success callback
        if (onSuccess) onSuccess();

        // Display the number of coins
        Swal.fire({
            title: "Category Selected!",
            text: `You have earned ${calculatedCoins} coins!`,
            icon: "success",
            confirmButtonText: "Cool",
        });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user);

                // Show SweetAlert success message
                Swal.fire({
                    icon: "success",
                    title: "Logged In Successfully!",
                    text: "You have successfully logged in with Google.",
                    confirmButtonText: "OK",
                })
                .then(() => {
                    // Check the user role from the backend
                    axiosPublic.get(`/users/role/${result.user.email}`)
                        .then((response) => {
                            const userRole = response.data.role; // Assuming the backend sends back the user's role

                            // If the user is an admin, skip the category selection process
                            if (userRole === "admin") {
                                Swal.fire({
                                    icon: "info",
                                    title: "Admin Logged In",
                                    text: "You are logged in as an admin. No need to select a category.",
                                    confirmButtonText: "OK",
                                });

                                // Optionally, proceed with the admin flow here, if needed
                                return; // Skip category selection
                            }

                            // If the user is not an admin, prompt for category selection
                            Swal.fire({
                                title: "Choose your category",
                                text: "Please select one of the categories below:",
                                icon: "question",
                                showCancelButton: true,
                                confirmButtonText: "User",
                                cancelButtonText: "TaskCreator",
                            }).then((resultCategory) => {
                                let category = null;
                                let calculatedCoins = 0;

                                if (resultCategory.isConfirmed) {
                                    category = "User";
                                    calculatedCoins = 10;
                                } else if (resultCategory.dismiss === Swal.DismissReason.cancel) {
                                    category = "TaskCreator";
                                    calculatedCoins = 50;
                                }

                                // Set category and coins
                                handleCategorySelection(category);

                                // Save user data to backend after category selection
                                const userInfo = {
                                    email: result.user.email,
                                    name: result.user.displayName,
                                    photoUrl: result.user.photoURL,
                                    userCategory: category,
                                    coins: calculatedCoins,
                                };

                                axiosPublic.post('/users', userInfo)
                                    .then((res) => {
                                        console.log('User data saved successfully', res.data);
                                    })
                                    .catch((error) => {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error saving data',
                                            text: error.message,
                                        });
                                    });
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                          
                        });
                });
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: error.message,
                    confirmButtonText: "OK",
                });
            });
    };

    return (
        <div>
            <Button
                className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-300"
                variant="outline"
                onClick={handleGoogleSignIn}
            >
                <FcGoogle size={24} /> Sign in with Google
            </Button>

            {/* Display selected category and coins */}
            {selectedCategory && (
                <div className="mt-4">
                    <p className="text-center">Selected Category: {selectedCategory}</p>
                    <p className="text-center">You have earned {coins} coins!</p>
                </div>
            )}
        </div>
    );
};
