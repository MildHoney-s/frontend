import SimpleLayout from '@/layouts/simple'
import ChapterTwoTestPage from '@/pages/ChapterTwoTest'
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
        { path: 'part2', element: <ChapterTwoTestPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/home" replace />,
    },
  ])

  return routes
}
