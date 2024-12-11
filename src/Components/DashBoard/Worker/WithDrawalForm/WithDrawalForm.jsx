import { useForm } from "react-hook-form";
import { UseUsers } from "../../../../Hooks/useUsers";
import { UseAuth } from "../../../../Hooks/useAuth";
import { UseAxiosSecure } from "../../../../Hooks/useAxiosSecure";
import { useState, useEffect } from "react";

export const WithDrawalForm = () => {
  const [users] = UseUsers();
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const [isPending, setIsPending] = useState(false); // State for pending status
  const [isLoading, setIsLoading] = useState(false); // State for loader

  // Find the current user in the users array
  const currentUser = users?.find(
    (u) => u?.email?.toLowerCase() === user?.email?.toLowerCase()
  );

  // Get the available coins for the current user
  const availableCoins = currentUser?.coins || 0;

  // Calculate USD value from the available coins (1 USD = 20 coins)
  const usdAmount = availableCoins / 20;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Check if the user has a pending withdrawal on component mount
  useEffect(() => {
    const checkPendingStatus = async () => {
      try {
        const response = await axiosSecure.get(`/withDraw/${currentUser?.name}`);
        setIsPending(response.data?.status === "pending");
      } catch (error) {
        console.error("Error fetching withdrawal status:", error);
      }
    };

    if (currentUser) {
      checkPendingStatus();
    }
  }, [currentUser, axiosSecure]);

  const onSubmit = async () => {
    setIsLoading(true);
    const withdrawalData = {
      userId: currentUser.name, // or whatever user ID you're using
      amount: usdAmount.toFixed(2), // Send the USD amount
      status: "pending", // Set the status as pending
    };

    try {
      const response = await axiosSecure.post("/withDraw", withdrawalData);
      if (response.data?.message === "Already added") {
        alert("You already have a pending withdrawal.");
        setIsPending(true);
      } else {
        alert("Withdrawal request submitted successfully!");
        setIsPending(true);
      }
    } catch (error) {
      console.error("Error submitting withdrawal request:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-indigo-600 font1 mb-8">Withdrawal Form</h1>
      <p className="text-center text-lg font-medium text-gray-700 mb-6">
        You have <span className="text-indigo-600 font1 font-bold">{availableCoins}</span> coins
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="text-xl font-medium text-gray-800 mb-2 font1">Your Current Converted Money : </h2>
          <p className="py-3 px-4 bg-gray-100 text-gray-700 rounded-md shadow-sm">
            {usdAmount.toFixed(2)}$
          </p>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isPending || isLoading}
            className={`w-full p-3 font-semibold rounded-md transition-all focus:outline-none ${
              isPending || isLoading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <span className="loading  loading-spinner loading-lg"></span>
                <span>Processing...</span>
              </div>
            ) : isPending ? (
              <div className="font1 text-2xl">
                <p className="text-sm text-gray-800">Pending Approval</p>
              </div>
            ) : (
              <span className="font1">Withdraw</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};