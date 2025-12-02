import { Outlet } from "react-router"
import Navbar from "../../../dashnav"

import AdminDrawer from "../aside/admindrawer"
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux"
import type { RootState } from "../../../../app/store"

const admindashboard = () => {

    const user = useSelector((state: RootState) => state.user.user)
    const Username = user?.Username
  const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prev) => !prev)
    }



  return (
    <div >
        <Navbar />

            {/* bars */}
            <div className="flex px-4 py-4 bg-gray-700 items-center mt-20">
                <button className="mr-4 text-white text-2xl lg:hidden" onClick={handleDrawerToggle}>

                    {drawerOpen ? <IoMdClose /> : <FaBars />}


                </button>
                <span className="text-white text-lg font-semibold">
                    Welcome back          {
            Username ? (
            <span className="text-orange-400"> {Username}</span>
              ) : ""
           }
                </span>

            </div>

        <div className="flex">
            <aside   className={`
                         fixed top-35  w-64 bg-gray-500
                          ${drawerOpen ? '' : "hidden"}
                        lg:static lg:block lg:w-64
                        `}
                    style={{ minHeight: "100vh" }}
            >
                <AdminDrawer />
            </aside>
        <main>

            <Outlet />
           
        </main>
       
        </div>

    </div>
  )
}

export default admindashboard