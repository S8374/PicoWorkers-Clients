import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const PaymentSuccess = () => {
    const { tran_id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: "Payment Successful!",
            text: `Transaction ID: ${tran_id}`,
            icon: "success",
            confirmButtonText: "OK",
        });
    }, [tran_id]); // Trigger the alert when `tran_id` changes

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="payment-success flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center max-w-md w-full">
                <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful</h1>
                <p className="text-gray-700 mb-6">Transaction ID: <span className="font-semibold">{tran_id}</span></p>
                <button
                    onClick={handleGoHome}
                    className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-all duration-300"
                >
                    Go to Home
                </button>
            </div>
        </div>
    );
};