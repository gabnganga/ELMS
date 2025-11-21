import { useSelector } from "react-redux"
import type { RootState } from "../../app/store"
import NavBar from "../../components/nav"

const Employeedashboard = () => {

  const user = useSelector((state: RootState) => state.user.user)
  const Username = user?.Username
  return (
    <>
    <NavBar />
    <div className="mt-50">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            <span>Welcome back </span>
           {
            Username ? (
            <span className="text-blue-700">{Username}</span>
              ) : ""
           }
            </h2></div>
          
    </>
  )
}

export default Employeedashboard