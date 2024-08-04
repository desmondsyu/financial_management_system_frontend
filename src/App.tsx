import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from "./error-page.tsx";
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

import Login from './login/login.tsx';
import Register from './login/register/register-page.tsx';
import RegisterAuthCode from './login/register/register-authcode.tsx';
import RegisterFinish from './login/register/register-finish.tsx';
import ResetEnterEmail from './login/resetpassword/reset-email.tsx';
import ResetAuthCode from './login/resetpassword/reset-authcode.tsx';
import ResetSetNew from './login/resetpassword/reset-newpw.tsx';
import ResetFinsh from './login/resetpassword/reset-finish.tsx';

import HomeLayout from './homepage/layout.tsx';
import Transactions from './homepage/transactions/transactions.tsx';
import Dashboard from './homepage/dashboard/dashboard.tsx';

import Profile from './homepage/menuitems/profile.tsx';
import Books from './homepage/menuitems/books.tsx';
import Category from './homepage/menuitems/category.tsx';
import Report from './homepage/menuitems/report.tsx';

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
    element: <HomeLayout />,
    children: [
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "transactions/:transactionId/view",

      },
      {
        path: "transactions/:transactionId/edit"

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

// const store = createStore({
//   authName: '_auth',
//   authType: 'cookie',
//   cookieDomain: window.location.hostname,
//   cookieSecure: window.location.protocol === 'https:',
// });

export default function App() {
  return (
    // <AuthProvider store={store}>
      <RouterProvider router={router} />
    // </AuthProvider>
  );
}
