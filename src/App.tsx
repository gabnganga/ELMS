import Landingpage from "./components/landingpage"

import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import Register from "./components/auth/register"
import Login from "./components/auth/login"
import { Toaster } from "sonner"
import Admindashboard from "./components/dashboards/admindashboard/content/admindashboard"
import Employeedashboard from "./components/dashboards/Employeedashboard/content/empoyeedashboard"
import { useSelector } from "react-redux"
import type { RootState } from "./app/store"


function App() {
  const isAdmin = useSelector((state: RootState) => state.user.user?.role === 'Admin')
  const isEmployee = useSelector((state: RootState) => state.user.user?.role === 'Employee')
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
      {
      path: '/admin/dashboard',
      element: isAdmin ? <Admindashboard/> : <Login/>,
      children:[
        {
          path: 'requests',
          element: <div>Admin Requests Page</div>
        },
        {
          path: 'employees',
          element: <div>Admin Employees Page</div>
        },
                {
          path: 'reports',
          element: <div>Admin Reports Page</div>
        },
                {
          path: 'profile',
          element: <div>Admin Profile Page</div>
        },
                {
          path: 'settings',
          element: <div>Admin Settings Page</div>
        },
      
      ]
    },
         {
      path: '/employee/dashboard',
      element: isEmployee ? <Employeedashboard/> : <Login />,
            children:[
        {
          path: 'requests',
          element: <div>Employee Requests Page</div>
        },
        
                {
          path: 'profile',
          element: <div>Employee Profile Page</div>
        },
                {
          path: 'settings',
          element: <div>Employee Settings Page</div>
        },
      
      ]
    },
       

  ])

  return (
    <>
    
     <RouterProvider router={router} />
       < Toaster position='top-right' richColors />
    
    </>
    
    )
}

export default App
