import image from "../assets/employeeimage.avif"

function hero() {
  return (
      <main className="flex flex-col md:flex-row items-center justify-between flex-1 px-10 md:px-20 py-0">
        <div className="md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Welcome to <span className="text-blue-700">Employee Leave Management System</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Simplify leave requests, approvals, and tracking — all in one easy-to-use platform.
          </p>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white rounded-xl px-6 py-3 hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 rounded-xl px-6 py-3 hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>

      
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={image}
            alt="employees"
            className="w-80 md:w-[400px]"
          />
        </div>
      </main>
  )
}

export default hero