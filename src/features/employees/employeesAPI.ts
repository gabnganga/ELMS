import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";



export type TEmployee= {
       
        staffid: number,
        username: string,
        email: string
        password: string
        role: string
}
export const employeesAPI = createApi({
    reducerPath: 'employeesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,

        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
        headers.set('Content-Type', 'application/json');
        return headers;
        } 
    }),

 
    tagTypes: ['employees'],
    endpoints: (builder) => ({
        createEmployee: builder.mutation<TEmployee, Partial<TEmployee>>({
            query: (employeeData) => ({
                url: '/users',
                method: 'POST',
                body: employeeData
            }),
            invalidatesTags: ['employees']
}),
        getLeaveRequests: builder.query< {data: TEmployee[]}, void>({
            query: () => '/users',
            providesTags: ['employees']  
    }),
    deleteEmployee: builder.mutation<void, number>({
    query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
    }),
    invalidatesTags: ['employees']
}),
    updateEmployee: builder.mutation<TEmployee, Partial<TEmployee> & { id: number }>({
    query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: data,
    }),
    invalidatesTags: ['employees'],
}),

    updatePassword: builder.mutation<TEmployee, Partial<TEmployee> & { id: number }>({
    query: ({ id, ...data }) => ({
        url: `/users/${id}/password`,
        method: 'PUT',
        body: data,
    }),
    invalidatesTags: ['employees'],
}),
    getReports: builder.query<any, void>({
    query: () => '/reports',
    providesTags: ['employees']
})

})
});
export const { useGetReportsQuery } = employeesAPI;