import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../@types'

interface InitialState {
    products: Product[]
}

const productsState: InitialState = {
    products: []
}

const productSlice = createSlice({
    name: 'product',
    initialState: productsState,
    reducers: {
        saveProducts: (state, action: PayloadAction<Product[]>) => {
            return { ...state, products: action.payload }
        }
    }
})

export const { saveProducts } = productSlice.actions

export default productSlice.reducer
