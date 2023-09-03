import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Notification = {
    inventoriesNotification: string
}

interface InitialState {
    notifications: Notification[]
}

const notificationsState: InitialState = {
    notifications: []
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: notificationsState,
    reducers: {
        saveInventoryNotification: (state, action: PayloadAction<Notification>) => {
            return { ...state, notifications: [...state.notifications, action.payload] }
        },

        removeInventoryNotification: state => {
            return { ...state, notifications: [] }
        }
    }
})

export const { saveInventoryNotification, removeInventoryNotification } = notificationSlice.actions

export default notificationSlice.reducer
