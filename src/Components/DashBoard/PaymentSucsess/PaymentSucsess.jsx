import { useParams } from 'react-router-dom';

export const PaymentSucsess = () => {
    const { tran_id } = useParams();
    

    return (
        <div className="payment-success">
            <h1>Payment Successful</h1>
            <p>Transaction ID: {tran_id}</p>
        </div>
    );
};
