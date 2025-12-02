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
import Leaverequest from "./components/dashboards/admindashboard/content/leaverequests/leaverequest"
import Employees from "./components/dashboards/admindashboard/content/employees/employees"
import Reports from "./components/dashboards/admindashboard/content/reports/report"
import Profile from "./components/dashboards/admindashboard/content/profile/profile"
import Logout from "./components/dashboards/admindashboard/content/logout"
import Lrequests from "./components/dashboards/Employeedashboard/content/leaverequests/lrequests"


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
          element: <Leaverequest/>
        },
        {
          path: 'employees',
          element: <Employees/>
        },
                {
          path: 'reports',
          element: <Reports/>
        },
                {
          path: 'profile',
          element:<Profile/>
        },
                        {
          path: 'logout',
          element:<Logout/>
        },


      ]
    },
         {
      path: '/employee/dashboard',
      element: isEmployee ? <Employeedashboard/> : <Login />,
            children:[
        {
          path: 'requests',
          element: <Lrequests/>
        },
        
                {
          path: 'profile',
          element: <Profile/>
        },
                        {
          path: 'logout',
          element: <Logout/>
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
