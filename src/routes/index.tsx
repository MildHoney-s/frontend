import SimpleLayout from '@/layouts/simple'
import ChapterThreeTest from '@/pages/ChapterThreeTest'
import ChapterTwoTestPage from '@/pages/ChapterTwoTest'
import CreditPage from '@/pages/Credits'
import LandingPage from '@/pages/Landing'
import StoryPage from '@/pages/Story'
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
        { index: true, element: <LandingPage /> },
        { path: 'story', element: <StoryPage /> },
        { path: 'credits', element: <CreditPage /> },
        { path: 'part2', element: <ChapterTwoTestPage /> },
        { path: 'part3', element: <ChapterThreeTest /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ])

  return routes
}
