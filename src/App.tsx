import Landingpage from "./components/landingpage"

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'



function App() {
  const router = createBrowserRouter([

        {
      path: '/',
      element: <Landingpage />
    },

       {
      path: '/login',
      element: <p>Hello I will login later</p>
    },    
    
    {
      path: '/register',
      element: <p>Hahaha I will register</p>
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
