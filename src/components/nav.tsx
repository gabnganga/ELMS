import { NavLink } from "react-router"
import logo from "../assets/images/logo.png"



const nav = () => {
  return (
        <div className="fixed top-0 left-0 right-0 bg-white mb-60 flex items-center  justify-between px-10 py-6 border-b border-gray-200">
    
    <div className="flex items-center space-x-3"> 
      <img src={logo} alt="Logo" className="w-30 h-10"/>
      
        </div>

        <nav className="space-x-8 text-gray-700 font-medium">
          <a href="#home" className="hover:text-blue-600">Home</a>
          <a href="#features" className="hover:text-blue-600">Features</a>
         <a href="#footer" className="hover:text-blue-600">Contacts</a>
          <NavLink to="/register">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
            Register
          </button></NavLink>
          <NavLink to="/login">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
            Login
          </button></NavLink>
        </nav>
     
    </div>
  )
}

export default nav