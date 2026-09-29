import { createBrowserRouter } from 'react-router';
import { AppLayout } from '../AppLayout';
import { Home } from '../pages/Home';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        path: '/',
        Component: Home,
      },
    ],
  },
]);
