import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getInventories, getInventoriesByStatus } from '../../controllers/InventoriesController'
import { Inventory } from '../../@types'

interface InitialState {
    inventories: Inventory[]
    loading: boolean
    error: string | null
}

const inventoriesState: InitialState = {
    inventories: [],
    loading: false,
    error: null
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllInventories = createAsyncThunk<Inventory[] | any>('inventories/all', async () => {
    try {
        const inventories = await getInventories()
        return inventories
    } catch (error) {
        console.log(error)
    }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInventoriesByTheirStatus = createAsyncThunk<Inventory[] | any, string>('inventories/status', async status => {
    try {
        const inventories = await getInventoriesByStatus(status)
        return inventories
    } catch (error) {
        console.log(error)
    }
})

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: inventoriesState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllInventories.pending, (state: InitialState) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getAllInventories.fulfilled, (state: InitialState, action: PayloadAction<Inventory[]>) => {
            state.loading = false
            state.error = null
            state.inventories = action.payload
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.addCase(getAllInventories.rejected, (state: InitialState, action: PayloadAction<string | any>) => {
            state.loading = false
            state.error = action.payload || 'Failed to get inventories by status'
        })

        // get inventories by status
        builder.addCase(getInventoriesByTheirStatus.pending, (state: InitialState) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(
            getInventoriesByTheirStatus.fulfilled,
            (state: InitialState, action: PayloadAction<Inventory[]>) => {
                state.loading = false
                state.error = null
                state.inventories = action.payload
            }
        )
        builder.addCase(
            getInventoriesByTheirStatus.rejected,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (state: InitialState, action: PayloadAction<string | any>) => {
                state.loading = false
                state.error = action.payload || 'Failed to get inventories by status'
            }
        )
    }
})

export { getAllInventories, getInventoriesByTheirStatus }

export default inventorySlice.reducer
