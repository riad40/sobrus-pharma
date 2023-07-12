import { InventoryProducts } from '../../../@types'

type InventoryStackParamsList = {
    InventoriesList: undefined
    InventoryDetails: { inventoryId: number }
    KnownProducts: { products: InventoryProducts[] }
    UnknownProducts: { products: InventoryProducts[] }
}

export default InventoryStackParamsList
