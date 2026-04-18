import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import BlankLayout from '../Layouts/LogoOnlyLayout';
import LoadingScreen from '../Components/LoadingScreen';
import AuthGuard from '../AuthGuard';
import DashboardLayout from '../Layouts/DashboardLayout ';
const Loadable = (Component :any) => (props :any) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};
export default function Router() {
  return useRoutes([  
 {
      path: "auth",
      children: [{ path: "login", element: <Login /> }],
    },
     {
      path: "/",
      element: <Navigate to="/auth/login" replace />,
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { index: true, element: <Navigate to="/dashboard" replace /> },
        {
          path: "user", element: <UserList />
          
        },
         {
          path: "leads", element: <LeadList />
          
        }
      ],
    },
      {
      path: "*",
      element: <BlankLayout />,
      children: [
        { path: "500", element: <Page500 /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
  ]);
}
const Login = Loadable(lazy(() => import('../pages/Login')));
const NotFound = Loadable(lazy(() => import('../pages/PageNotFound')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const UserList = Loadable(lazy(() => import('../pages/users')));
const LeadList = Loadable(lazy(() => import('../pages/leads')));