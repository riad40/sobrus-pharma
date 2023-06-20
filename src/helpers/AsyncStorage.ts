import AsyncStorage from '@react-native-async-storage/async-storage'

// save item to async storage
const saveItem = async <T>(key: string, value: T): Promise<void> => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (error) {
        console.log(error)
    }
}

// get item from async storage
const getItem = async (key: string): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        console.log(error)
        return null
    }
}

// remove item from async storage
const removeItem = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (error) {
        console.log(error)
    }
}

export { saveItem, getItem, removeItem }
