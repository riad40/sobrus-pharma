import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Inventory } from '../../@types'

interface InitialState {
    inventories: Inventory[]
}

const inventoriesState: InitialState = {
    inventories: []
}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: inventoriesState,
    reducers: {
        saveInventories: (state, action: PayloadAction<Inventory[]>) => {
            return { ...state, inventories: action.payload }
        },

        getInventoriesByStatus: (state, action: PayloadAction<string>) => {
            const { inventories } = state
            return {
                inventories: inventories.filter(inventory => inventory.status !== action.payload)
            }
        }
    }
})

export const { saveInventories, getInventoriesByStatus } = inventorySlice.actions

export default inventorySlice.reducer
