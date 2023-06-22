import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getInventories } from '../../controllers/InventoriesController'
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

const getInventoriesByStatus = createAsyncThunk<Inventory[], number>('inventories/all', async (status: number) => {
    try {
        // Fetch the inventories from firebase
        const data = await getInventories()
        const inventories: Inventory[] = data as Inventory[]

        // Apply the filtering based on the status
        let filteredInventories: Inventory[] = []

        switch (status) {
            case 0:
                filteredInventories = inventories
                break
            case 1:
                filteredInventories = inventories.filter(inventory => inventory.status === 'fermé')
                break
            case 2:
                filteredInventories = inventories.filter(inventory => inventory.status === 'ouvert')
                break
            default:
                filteredInventories = inventories
                break
        }

        return filteredInventories
    } catch (error) {
        throw new Error('Failed to get inventories by status')
    }
})

const inventorySlice = createSlice({
    name: 'inventory',
    initialState: inventoriesState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getInventoriesByStatus.pending, (state: InitialState) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getInventoriesByStatus.fulfilled, (state: InitialState, action: PayloadAction<Inventory[]>) => {
            state.loading = false
            state.error = null
            state.inventories = action.payload.map(inventory => inventory)
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builder.addCase(getInventoriesByStatus.rejected, (state: InitialState, action: PayloadAction<string | any>) => {
            state.loading = false
            state.error = action.payload || 'Failed to get inventories by status'
        })
    }
})

export { getInventoriesByStatus }

export default inventorySlice.reducer
