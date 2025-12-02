
import logo from "../assets/images/logo.png"



const nav = () => {
  return (
        <div className="fixed top-0 left-0 right-0 z-10 bg-white mb-60 flex items-center  justify-between px-10 py-6 border-b border-gray-200">
    
    <div className="flex items-center space-x-3"> 
      <img src={logo} alt="Logo" className="w-30 h-10"/>
      
        </div>

    </div>
  )
}

export default nav