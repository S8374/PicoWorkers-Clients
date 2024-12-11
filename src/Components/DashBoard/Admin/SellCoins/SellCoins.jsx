import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UseAxiosSecure } from '../../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'; // Import SweetAlert2

export const SellCoins = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const axiosSecure = UseAxiosSecure();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true); // Show loading indicator while submitting

    try {
      const response = await axiosSecure.post('/coins', data);
      console.log('Coin added successfully:', response.data);

      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Coin added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setLoading(false); // Hide loading indicator
    } catch (error) {
      console.error('Error adding coin:', error);

      // Show error alert if there's an issue
      Swal.fire({
        title: 'Error!',
        text: 'There was an error adding the coin.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });

      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg bg-white">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600 font1">Sell Coins</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="coinAmount" className="text-xl font-medium text-gray-700 font1">Amount of Coins</label>
          <input
            id="coinAmount"
            type="number"
            {...register('coinAmount', { required: 'This field is required' })}
            className="p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.coinAmount && <p className="text-red-500 text-xs mt-1">{errors.coinAmount.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="coinPrice" className="text-xl font-medium text-gray-700 font1">Coins Price</label>
          <input
            id="coinPrice"
            type="number"
            {...register('coinPrice', { required: 'This field is required' })}
            className="p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.coinPrice && <p className="text-red-500 text-xs mt-1">{errors.coinPrice.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="tittle" className="text-xl font-medium text-gray-700 font1">Coins Title</label>
          <input
            id="tittle"
            type="text"
            {...register('tittle', { required: 'This field is required' })}
            className="p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.tittle && <p className="text-red-500 text-xs mt-1">{errors.tittle.message}</p>}
        </div>

        <button 
          type="submit" 
          className={`w-full py-3 rounded-md mt-4 font1 text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'}`} 
          disabled={loading}
        >
          {loading ? 'Adding Coin...' : 'Add To Sell'}
        </button>
      </form>
    </div>
  );
};
