
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiDomain } from "../../utils/ApiDomain";



export type TloginResponse = {
        
        message: string,
        token: string,
        user: {
                Staffid: number,
                Email: string,
                Username: string,
                role: string

        }

}

type LoginInputs = {
        email: string,
        password: string;
}

export const loginAPI = createApi({
    reducerPath: 'loginAPI',
    baseQuery: fetchBaseQuery({ baseUrl: ApiDomain }),
    tagTypes: ['Login'],
    endpoints: (builder) => ({
        loginUser: builder.mutation<TloginResponse, LoginInputs>({
            query: (loginData) => ({
                url: '/login',
                method: 'POST',
                body: loginData
            }),
            invalidatesTags: ['Login']
        })
    })
})