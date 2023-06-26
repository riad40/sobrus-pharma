import { doc, setDoc, getDocs, collection } from 'firebase/firestore'
import { db } from '../configs/firebase'
import { Inventory } from '../@types'

// Create a new inventory
const createInventory = async (inventory: Inventory) => {
    try {
        const docRef = doc(db, 'inventories', inventory.id.toString())
        const docSnap = await setDoc(docRef, inventory)
        console.log('Document written with ID: ', docSnap)
    } catch (e) {
        console.error(e)
    }
}

// get all inventories
const getInventories = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'inventories'))
        const inventories: Inventory[] = []
        querySnapshot.forEach(doc => {
            inventories.push(doc.data() as Inventory)
            inventories[inventories.length - 1].id = inventories.length
        })
        return inventories
    } catch (e) {
        console.error(e)
    }
}

// get inventory by id
const getInventoryById = async (id: number) => {
    try {
        const docRef = doc(db, 'inventories', id.toString())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const docSnap = await getDocs(docRef as any)
        return docSnap.docs.map(doc => doc.data() as Inventory)
    } catch (e) {
        console.error(e)
    }
}

// get inventories by status
const getInventoriesByStatus = async (status: string) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'inventories'))
        const inventories: Inventory[] = []
        querySnapshot.forEach(doc => {
            if (doc.data().status === status) {
                inventories.push(doc.data() as Inventory)
                inventories[inventories.length - 1].id = inventories.length
            }
        })
        return inventories
    } catch (e) {
        console.error(e)
    }
}

// update inventory status by id
const updateInventoryStatusById = async (id: number, status: string) => {
    try {
        const docRef = doc(db, 'inventories', id.toString())
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const docSnap = await getDocs(docRef as any)
        const inventory = docSnap.docs.map(doc => doc.data() as Inventory)[0]
        inventory.status = status
        const updatedDocRef = doc(db, 'inventories', inventory.id.toString())
        const updatedDocSnap = await setDoc(updatedDocRef, inventory)
        console.log('Document written with ID: ', updatedDocSnap)
    } catch (e) {
        console.error(e)
    }
}

export { createInventory, getInventories, getInventoryById, getInventoriesByStatus, updateInventoryStatusById }
