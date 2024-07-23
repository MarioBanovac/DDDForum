import { Home, Register, Error } from "Controller";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/join',
    element: <Register />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
