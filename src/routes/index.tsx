import SimpleLayout from '@/layouts/simple'
import CreditPage from '@/pages/Credits'
import LandingPage from '@/pages/Landing'
import StoryPage from '@/pages/Story'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LandingPage />,
      index: true,
    },
    {
      path: '/',
      element: (
        <SimpleLayout>
          <Outlet />
        </SimpleLayout>
      ),
      children: [
        { path: 'story', element: <StoryPage /> },
        { path: 'credits', element: <CreditPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])

  return routes
}
