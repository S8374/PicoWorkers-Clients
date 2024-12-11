import { Button } from '@nextui-org/button';
import { UseUsers } from '../../../Hooks/useUsers';
import { useEffect } from 'react';
import { useState } from 'react';
import { UseAuth } from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';

export const CheckPints = () => {
    const [isCheckCoinsButtonHidden, setIsCheckCoinsButtonHidden] =useState(false);
    const { user } = UseAuth();
    const [users,  refetch] = UseUsers();
      // Load the state of the button from local storage
  useEffect(() => {
    const buttonHiddenState = localStorage.getItem("isCheckCoinsButtonHidden");
    if (buttonHiddenState === "true") {
      setIsCheckCoinsButtonHidden(true);
    }
  }, []);
  const checkCoins = () => {
    if (user) {
      const currentUser = users.find((u) => u.email === user.email);
      if (currentUser && currentUser.coins > 0) {
        Swal.fire({
          icon: "info",
          title: "Coins Found!",
          text: "You already have coins in your account.",
          confirmButtonText: "OK",
        }).then(() => {
          setIsCheckCoinsButtonHidden(true); // Hide the button
          localStorage.setItem("isCheckCoinsButtonHidden", "true"); // Save the state to local storage
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "No Coins Found!",
          text: "You don't have any coins yet.",
          confirmButtonText: "OK",
        });
      }
      refetch(); // Refresh the data
    }
  };
  return (
    <div>
                 {!isCheckCoinsButtonHidden && (
                  <Button
                    className="ml-4 bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-transform duration-300"
                    onClick={checkCoins}
                  >
                    Check rewards
                  </Button>
                )}
    </div>
  )
}
