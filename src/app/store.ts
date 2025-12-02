import storage from "redux-persist/lib/storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { loginAPI } from "../features/auth/loginAPI"
import { persistReducer, persistStore } from "redux-persist"
import userSlice from "../features/auth/userslice"
import { leaverequestAPI } from "../features/leaves/leaverequestAPI"
import { employeesAPI } from "../features/employees/employeesAPI"



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['user']// Only persist the user slice - this means only the user state will be saved in local storage
}

const rootReducer = combineReducers({ //combining all reducers into one root reducer

    [loginAPI.reducerPath]: loginAPI.reducer,
    [leaverequestAPI.reducerPath]: leaverequestAPI.reducer,
    [employeesAPI.reducerPath]: employeesAPI.reducer,
  
    user: userSlice

})
export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
        
        .concat(loginAPI.middleware)
        .concat(leaverequestAPI.middleware)
        .concat(employeesAPI.middleware)

       
    // 
})
export const persistedStore = persistStore(store)
export type RootState = ReturnType<typeof store.getState>