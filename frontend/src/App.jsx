import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import { routes } from './routes/routes';
import UserRoot from './pages/user/UserRoot';

const router = createBrowserRouter(routes);


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
