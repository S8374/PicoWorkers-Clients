import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../Components/Pages/Root/Root';
import { RootHome } from '../Components/Pages/RootHome/RootHome';
import { DashBoard } from '../Components/DashBoard/DashBoard';
import { TaskReview } from '../Components/DashBoard/TaskCreator/TaskReview/TaskReview';
import { AddNewTask } from '../Components/DashBoard/TaskCreator/AddNewTask/AddNewTask';
import { MySubmission } from '../Components/DashBoard/Worker/MySubmission/MySubmission';
import { AllTaskList } from '../Components/DashBoard/Worker/AllTaskList/AllTaskList';
import { Details } from '../Components/DashBoard/Worker/Details/Details';
import { AddMyTask } from '../Components/DashBoard/Worker/AddMyTask/AddMyTask';
import { WithdrawRequest } from '../Components/DashBoard/Admin/WithdrawRequest/WithdrawRequest';
import { ManageUsers } from '../Components/DashBoard/Admin/ManageUsers/ManageUsers';
import { ManageTasks } from '../Components/DashBoard/Admin/ManageTasks/ManageTasks';

import { SellCoins } from '../Components/DashBoard/Admin/SellCoins/SellCoins';
import { ByeCoins } from '../Components/DashBoard/BuyCoins/ByeCoins';
import { PaymentSucsess } from '../Components/DashBoard/PaymentSucsess/PaymentSucsess';
import { FailPayments } from '../Components/DashBoard/FailPayments/FailPayments';
import { CoinBuyReq } from '../Components/DashBoard/Admin/CoinBuyReq/CoinBuyReq';
import { PaymentHistory } from '../Components/DashBoard/TaskCreator/PaymentHistory/PaymentHistory';
import AdminRoute from '../Components/Private/AdminRoute/AdminRoute';
import { WithDrawalForm } from '../Components/DashBoard/Worker/WithDrawalForm/WithDrawalForm';



export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <RootHome />,
      },
      {

        path: 'success/:tran_id',
        element: <PaymentSucsess></PaymentSucsess>

      },
      {
        path: 'fail/:tran_id',
        element: <FailPayments></FailPayments>
      },
      {
        path: 'dashboard',
        element: <DashBoard />,
        children: [
          {
            path: '/dashboard/taskReview',
            element: <TaskReview />,
          },
          {
            path: '/dashboard/addTask',
            element: <AddNewTask />,
          },
          {
            path: '/dashboard/buyCoins',
            element: <ByeCoins></ByeCoins>
          },
          {
            path: '/dashboard/paymentHistory',
            element: <PaymentHistory></PaymentHistory>
          },
          {
            path: '/dashboard/workers/buyCoins',
            element: <ByeCoins />,
          },
          {
            path: '/dashboard/workers/allTaskList',
            element: <AllTaskList />,
          },

          {
            path: '/dashboard/workers/mySubmissions',
            element: <MySubmission />,
          },
          {
            path: '/dashboard/workers/addMyPost',
            element: <AddMyTask />,
          },
          {
            path: '/dashboard/workers/details/:id',
            element: <Details />,
            loader: async ({ params }) => {
              const response = await fetch(`https://pico-workers-server-theta.vercel.app/TaskItems/${params.id}`);
              if (!response.ok) {
                throw new Error('Failed to load task details');
              }
              return response.json();
            },
          },
          {
            path: '/dashboard/workers/withdrawal',
            element: <AdminRoute> <WithDrawalForm></WithDrawalForm></AdminRoute>,
          },
          {
            path: '/dashboard/admin/withdrawRequest',
            element: <AdminRoute><WithdrawRequest /></AdminRoute>,
          },
          {
            path: '/dashboard/admin/manageUsers',
            element: <ManageUsers />,
          },
          {
            path: '/dashboard/admin/manageTask',
            element: <AdminRoute><ManageTasks /></AdminRoute>,
          },
          {
            path: '/dashboard/admin/sellCoins',
            element: <AdminRoute><SellCoins /></AdminRoute>,
          },
          {
            path: '/dashboard/admin/buyCoins',
            element: <AdminRoute><CoinBuyReq /></AdminRoute>,
          }
        ],
      },
    ],
  },
]);
