import Navbar from "../../components/nav"
import Footer from "../footer"
import { useForm, type SubmitHandler } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router"
import { loginAPI } from "../../features/auth/loginAPI"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/userslice";

type LoginInputs = {

    email: string
    password: string

}

const schema = yup.object({
 email: yup.string().email('Invalid email').max(100, 'Max 100 characters').required('Email is required'),
 password: yup.string().min(5, 'Min 5 characters').max(255, 'Max 255 characters').required('Password is required'),
})


const Login= () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [loginUser, {isLoading} ] = loginAPI.useLoginUserMutation() 
   
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInputs>({
        resolver: yupResolver(schema)
    })

    const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
       try {
            const response = await loginUser(data).unwrap()
            //console.log("Response", response)
            toast.success(response.message)
            
             dispatch(loginSuccess(response))



            
            if (response.user.role === 'Admin') {
                navigate('/admin/dashboard/requests')
            } else if (response.user.role === 'Employee') {
                navigate('/employee/dashboard/requests')
            }



       } catch (error: any) {
            console.error("Error", error)
            toast.error(error.data.error)
    }
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



                        <button type="submit" className=" w-full mt-4 bg-blue-600 text-white rounded-xl px-6 py-3 hover:bg-blue-700 transition" disabled={isLoading}>
                            {
                                isLoading ? (
                                    <>
                                    <span className="loading loading-spinner text-primary"/>  please wait...
                                    </>
                                ) : (
                                    'Login'
                                )
                            }
                         
                        </button>

                        <p className="text-center">Don't have an account? <span className="text-blue-600 hover:underline">
                            <Link to="/register">Register here.</Link></span></p>
                    </form>

                </div>
            </div>
            <Footer />
        </>
    )
}
export default Login