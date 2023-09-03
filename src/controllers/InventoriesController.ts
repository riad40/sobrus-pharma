import { Inventory, InventoryProducts } from '../@types'
import realm from '../configs/realm'

// Create a new inventory
const createInventory = async (inventory: Inventory) => {
    realm.write(() => {
        realm.create<Inventory>('Inventory', {
            id: inventory.id,
            reason: inventory.reason,
            status: inventory.status,
            date: inventory.date,
            products: inventory.products
        })
    })
}

// get all inventories
const getInventories = () => {
    const inventories = realm.objects<Inventory>('Inventory')
    return Array.from(inventories)
}

// get inventories by status
const getInventoriesByStatus = (status: string) => {
    console.log(status)
    const inventories = realm.objects('Inventory').filtered(`status == "${status}"`)
    return inventories
}

// add products to inventory
const addProductsToInventory = (id: number, products: InventoryProducts[]) => {
    realm.write(() => {
        const inventoryToUpdate = realm.objects<Inventory>('Inventory').filtered(`id == ${id}`)[0]

        if (!inventoryToUpdate?.products) {
            inventoryToUpdate.products = products
            return
        }
        inventoryToUpdate.products = inventoryToUpdate.products.concat(products)
    })
}

// update inventory status
const updateInventoryStatus = (id: number, status: string) => {
    realm.write(() => {
        const inventoryToUpdate = realm.objects<Inventory>('Inventory').filtered(`id == ${id}`)[0]
        inventoryToUpdate.status = status
    })
}

// get inventory products
const getInventoryProducts = (id: number) => {
    const inventory = realm.objects<Inventory>('Inventory').filtered(`id == ${id}`)[0]
    return inventory.products
}

// get specific product from inventory
const getInventoryProduct = (id: number, codeBar: string) => {
    const inventory = realm.objects<Inventory>('Inventory').filtered(`id == ${id}`)[0]

    const product = inventory.products.filter((product: InventoryProducts) => product.codeBar === codeBar)[0]

    return product
}

// get inventory by id
const getInventoryById = (id: number) => {
    const inventory = realm.objects<Inventory>('Inventory').filtered(`id == ${id}`)[0]
    return inventory
}

export {
    createInventory,
    getInventories,
    getInventoriesByStatus,
    addProductsToInventory,
    updateInventoryStatus,
    getInventoryProducts,
    getInventoryProduct,
    getInventoryById
}
