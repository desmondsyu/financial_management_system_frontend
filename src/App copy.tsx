import Login from './login/login';
import Register from './login/register/register-page';
import RegisterAuthCode from './login/register/register-authcode';
import RegisterFinish from './login/register/register-finish';
import ResetEnterEmail from './login/resetpassword/reset-email';
import ResetAuthCode from './login/resetpassword/reset-authcode';
import ResetSetNew from './login/resetpassword/reset-newpw';
import ResetFinsh from './login/resetpassword/reset-finish';

import Layout from './homepage/layout';
import Transactions from './homepage/transactions/transactions';
import Dashboard from './homepage/dashboard/dashboard';
import Profile from './homepage/menuitems/profile';
import Books from './homepage/menuitems/books';
import Category from './homepage/menuitems/category';
import Report from './homepage/menuitems/report';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/register/auth",
    element: <RegisterAuthCode />,
  },
  {
    path: "/register/fin",
    element: <RegisterFinish />,
  },
  {
    path: "/resetpassword",
    element: <ResetEnterEmail />,
  },
  {
    path: "/resetpassword/auth",
    element: <ResetAuthCode />,
  },
  {
    path: "/resetpassword/reset",
    element: <ResetSetNew />,
  },
  {
    path: "/resetpassword/fin",
    element: <ResetFinsh />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
