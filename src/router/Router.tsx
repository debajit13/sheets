import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import SheetPage from '../pages/SheetPage';
import NotFound from '../pages/NotFound';
import Root from '../layout/Root';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/sheet/:id',
        element: <SheetPage />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default Router;
