import SimpleLayout from '@/layouts/simple'
import ComingSoonPage from '@/pages/coming-soon'
import CreditPage from '@/pages/credits'
import HomePage from '@/pages/home'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <SimpleLayout>
          <Outlet />
        </SimpleLayout>
      ),
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: 'credits', element: <CreditPage /> },
        { path: 'coming-soon', element: <ComingSoonPage /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ])

  return routes
}
