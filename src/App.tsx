import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import UnderConstruction from './pages/underConstruction';
import ErrorPage from './pages/error-page';
import Topbar from './components/topbar/topbar';
import SidebarNav from './components/sidebar/sidebar';

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="dashboard/:userId" element={<Dashboard />} />
        <Route path="user/:userId" element={<UnderConstruction />} />
        <Route path="settings/:userId" element={<UnderConstruction />} />
        <Route path="community" element={<UnderConstruction />} />
        {/* Route pour la page d'erreur (404) */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
const Root = () => {
  return (
    <div>
      <Topbar />
      <div className="layout_wrapper">
        <SidebarNav />
        <Outlet />
      </div>
    </div>
  );
};
