import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import Home from './pages/home/Home';

import UnderConstruction from './pages/underConstruction/UnderConstruction';
import ErrorPage from './pages/errorPage/Error-page';
import Topbar from './components/topbar/topbar';
import SidebarNav from './components/sidebar/sidebar';
import Dashboard from './pages/dashboard/Dashboard';

export function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="dashboard/:userId" element={<Dashboard />} />
        <Route path="user" element={<UnderConstruction />} />
        <Route path="settings" element={<UnderConstruction />} />
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
