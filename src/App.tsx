import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from "./error-page.tsx";

import Login from './pages/login/login.tsx';

import Register from './pages/login/register/register-page.tsx';
import RegisterAuthCode from './pages/login/register/register-authcode.tsx';
import RegisterFinish from './pages/login/register/register-finish.tsx';

import ResetEnterEmail from './pages/login/resetpassword/reset-email.tsx';
import ResetSetNew from './pages/login/resetpassword/reset-newpw.tsx';
import ResetFinsh from './pages/login/resetpassword/reset-finish.tsx';

import HomeLayout from './pages/homepage/layout.tsx';
import Transactions from './pages/homepage/transactions/transactions.tsx';
import CreateTransaction from './pages/homepage/transactions/create.tsx';
import ImportTransaction from './pages/homepage/transactions/import.tsx';
import RecurringTransaction from './pages/homepage/transactions/recurring.tsx';
import EditTransaction from './pages/homepage/transactions/edit.tsx';
import Dashboard from './pages/homepage/dashboard/dashboard.tsx';

import Profile from './pages/homepage/menuitems/profile.tsx';
import Books from './pages/homepage/menuitems/books.tsx';
import Category from './pages/homepage/menuitems/category.tsx';
import Report from './pages/homepage/menuitems/report.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />
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
    path: "/confirmemail",
    element: <ResetEnterEmail />,
  },
  {
    path: "/reset-password",
    element: <ResetSetNew />,
  },
  {
    path: "/resetpassword/fin",
    element: <ResetFinsh />,
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "transactions/create",
        element: <CreateTransaction />,
      },
      {
        path: "transactions/import",
        element: <ImportTransaction />,
      },
      {
        path: "transactions/recurring",
        element: <RecurringTransaction />,
      },
      {
        path: "transactions/:transactionId/edit",
        element: <EditTransaction />
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
