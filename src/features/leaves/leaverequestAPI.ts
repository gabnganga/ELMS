import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ApiDomain } from "../../utils/ApiDomain";
import type { RootState } from "../../app/store";



export type TLeaveRequest = {
        leaveid: number,
        staffid: number,
        username: string,
        leavetype: string,
        start_date: string,
        end_date: string,
        status: string,
        comment: string,
        role: string
}


export type Tcomments = {
    leaveid: number,
    comment: string,
    status: string,
    managerid: number | undefined
}


export const leaverequestAPI = createApi({
    reducerPath: 'leaverequestAPI',
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

 
    tagTypes: ['LeaveRequest'],
    endpoints: (builder) => ({
        requestLeave: builder.mutation<TLeaveRequest, Partial<TLeaveRequest>>({
            query: (leaveData) => ({
                url: '/leave',
                method: 'POST',
                body: leaveData
            }),
            invalidatesTags: ['LeaveRequest']
}),
        getLeaveRequests: builder.query< {data: TLeaveRequest[]}, void>({
            query: () => '/leave',
            providesTags: ['LeaveRequest'],
    }),


    
     getLeaveHistory: builder.query<TLeaveRequest[], number>({
      query: (id: number) => `/leave/${id}/history`,
      providesTags: ["LeaveRequest"],
    }),

updateLeave: builder.mutation({
  query: ({ leaveid, leavetypeid, start_date, end_date }) => ({
    url: `/leave/${leaveid}`,
    method: "PUT",
    body: { leavetypeid, start_date, end_date }
  }),
  invalidatesTags: ["LeaveRequest"],
}),

deleteLeave: builder.mutation({
  query: (leaveid: number) => ({
    url: `/leave/${leaveid}`,
    method: "DELETE"
  }),
  invalidatesTags: ["LeaveRequest"],
}),

 addComment: builder.mutation<Tcomments, Partial<Tcomments>>({
            query: (commentData) => ({
                url: '/approvals',
                method: 'POST',
                body: commentData,
            }),
            invalidatesTags: ['LeaveRequest'],
        }),



})
});