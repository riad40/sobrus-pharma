import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import inventorySlice from './features/InventorySlice'
import productSlice from './features/ProductSlice'
import notificationSlice from './features/NotificationSlice'

// combine all reducers
const rootReducer = combineReducers({
    inventories: inventorySlice,
    products: productSlice,
    notifications: notificationSlice
})

// create store
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
})

// define @types
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// export store
export default store
