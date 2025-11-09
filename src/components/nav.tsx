

function nav() {
  return (
  
    <div>
    
      <header className="flex items-center justify-between px-10 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="9" strokeWidth="2" />
            <path strokeWidth="2" strokeLinecap="round" d="M12 7v5l3 2" />
          </svg>
          <h1 className="text-2xl font-bold text-blue-700">ELMS</h1>
        </div>

        <nav className="space-x-8 text-gray-700 font-medium">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
            Login
          </button>
        </nav>
      </header>
    </div>
  )
}

export default nav