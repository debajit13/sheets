import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './router/Router';

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
