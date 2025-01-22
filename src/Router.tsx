import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import {LobbyPage} from "@/pages/Lobby.page";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/lobby/:code',
    element: <LobbyPage />
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
