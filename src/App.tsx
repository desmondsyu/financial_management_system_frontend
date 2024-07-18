import React from 'react';
import Login from './login/login.tsx';
import Register from './login/register/register-page.tsx';
import RegisterAuthCode from './login/register/register-authcode.tsx';
import RegisterFinish from './login/register/register-finish.tsx';
import ResetEnterEmail from './login/resetpassword/reset-email.tsx';
import ResetAuthCode from './login/resetpassword/reset-authcode.tsx';
import ResetSetNew from './login/resetpassword/reset-newpw.tsx';
import ResetFinsh from './login/resetpassword/reset-finish.tsx';

import Layout from './homepage/layout.tsx';
import Transactions from './homepage/transactions/transactions.tsx';
import Dashboard from './homepage/dashboard/dashboard.tsx';
import Profile from './homepage/menuitems/profile.tsx';
import Books from './homepage/menuitems/books.tsx';
import Category from './homepage/menuitems/category.tsx';
import Report from './homepage/menuitems/report.tsx';
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
