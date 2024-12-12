import { useQuery } from "@tanstack/react-query";
import { UseAxiosSecure } from "../../../Hooks/useAxiosSecure";
import { UseAuth } from "../../../Hooks/useAuth";
import { UseUsers } from "../../../Hooks/useUsers";
import { useState } from "react";
import Swal from "sweetalert2";

export const ByeCoins = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [users] = UseUsers();

  const { data: Coins = [], isLoading } = useQuery({
    queryKey: ['coins'],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/coins');
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch coins');
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 15, // 15 minutes
  });

  // Event handler to process payment
  const handlePayment = async (coin) => {
    console.log('Clicked coin details:', coin);

    const paymentDetails = {
      coinTitle: coin.tittle,
      coinPrice: coin.coinPrice,
      totalCoins: coin.coinAmount,
      timestamp: new Date().toISOString(),
      email: user.email,
      name: user.displayName,
      clickedCard: coin._id,
    };

    try {
      const response = await axiosSecure.post('/payments', paymentDetails);
      if (response.data) {
        window.location.replace(response.data.url);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Failed',
        text: error.response?.data?.error || 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 font1">Today's Offer: {Coins.length} Coins</h1>
      {isLoading ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-200 border-t-blue-500 rounded-full"></div>
          <span className="text-gray-500">Loading...</span>
        </div>
      ) : (
        <>
          {/* Table visible on medium and larger screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
              <thead className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
                <tr>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Quantity</th>
                  <th className="p-4 text-left">Payable Amount</th>
                  <th className="p-4 text-left">Completion Date</th>
                  <th className="p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {Coins.map((coin, index) => (
                  <tr
                    key={coin._id}
                    className={`border-t border-gray-200 text-sm ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <td className="p-3 font1 text-gray-800">{index + 1}</td>
                    <td className="p-3 text-gray-800 font-medium font1">{coin.tittle}</td>
                    <td className="p-3 text-gray-800">{coin.coinPrice}$</td>
                    <td className="p-3 font1 text-gray-800">{coin.coinAmount || "No Coins Available"}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handlePayment(coin)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none font1"
                      >
                        Buy Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile view - Coins displayed as cards */}
          <div className="md:hidden">
            {Coins.map((coin) => (
              <div
                key={coin._id}
                className="bg-white shadow-md rounded-lg mb-6 p-4 border border-gray-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">{coin.tittle}</h2>
                <p className="text-gray-600 mt-2">Price: {coin.coinPrice}$</p>
                <p className="text-gray-600 mt-2">Amount: {coin.coinAmount || "No Coins Available"}</p>
                <button
                  onClick={() => handlePayment(coin)}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
