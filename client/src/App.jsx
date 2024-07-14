import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import Account from './components/pages/Account';
import ProtectedRouter from './components/HOCs/ProtectedRouter';
import useStore from './store/index';

function App() {
  const user = useStore((state) => state.user);

  // if (!user) {
  //   // Добавьте проверку на случай, если user еще не загружен из localStorage
  //   return null; // или можно вернуть какой-то индикатор загрузки
  // }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <MainPage />,
        },
        {
          path: '/account',
          element: (
            <ProtectedRouter isAllowed={user.status === 'logged'} redirect="/auth/signin">
              <Account />
            </ProtectedRouter>
          ),
        },

        {
          element: <ProtectedRouter isAllowed={user.status !== 'logged'} />,
          children: [
            {
              path: '/auth/signup',
              element: <SignUpPage />,
            },
            {
              path: '/auth/signin',
              element: <SignInPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
