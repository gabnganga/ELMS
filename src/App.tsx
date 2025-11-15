import Landingpage from "./components/landingpage"

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Register from "./components/auth/register"
import Login from "./components/auth/login"



function App() {
  const router = createBrowserRouter([

        {
      path: '/',
      element: <Landingpage />
    },

       {
      path: '/login',
      element: <Login/>
    },    
    
    {
      path: '/register',
      element: <Register/>
    },
           {
      path: '*',
      element: <p>Page not found</p>
    },

  ])

  return (
    <>
    
     <RouterProvider router={router} />
    
    </>
    
    )
}

export default App
