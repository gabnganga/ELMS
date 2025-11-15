import Navbar from "../../components/nav"
import Footer from "../footer"
import { useForm, type SubmitHandler } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router"


type RegisterInputs = {

    email: string
    password: string

}

const schema = yup.object({
 email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
 password: yup.string().min(6, 'Min 6 characters').max(255, 'Max 255 characters').required('Password is required'),
})


const Register = () => {
   
   
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
        
            const response = await(data)
            console.log("Response", response);
          

    }

    return (
        <>
            <Navbar />

            <div className="flex justify-center items-center min-h-screen bg-gray-100  ">
                {/* useform, yup */}


                <div className="w-full max-w-lg p-8 rounded-xl shadow-lg bg-white  ">
                    <h1 className="text-3xl text-blue-600 font-bold mb-6 text-center">Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">

                    
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="Email"
                            className="border border-gray-300 rounded w-full p-2 text-lg"

                        />
                        {
                            errors.email && (
                                <span className="text-red-700 text-sm">{errors.email.message}</span>
                            )
                        }
                       
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                            className="border border-gray-300 rounded w-full p-2 text-lg"
                        />
                        {
                            errors.password && (
                                <span className="text-red-700 text-sm">{errors.password.message}</span>
                            )
                        }



                        <button type="submit" className=" w-full mt-4 bg-blue-600 text-white rounded-xl px-6 py-3 hover:bg-blue-700 transition" >
                            Login
                         
                        </button>

                        <p className="text-center">Don't have an account? <p className="text-blue-600 hover:underline">
                            <Link to="/register">Register here.</Link></p></p>
                    </form>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default Register