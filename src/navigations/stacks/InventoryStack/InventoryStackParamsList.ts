import { InventoryProducts } from '../../../@types'
import { RouteProp } from '@react-navigation/native'

type InventoryStackParamsList = {
    InventoriesList: undefined
    ScanningScreen: { id: number }
    InventoryDetails: { inventoryId: number }
    KnownProducts: { products: InventoryProducts[] }
    UnknownProducts: { products: InventoryProducts[] }
}

export type InventoryStackNavProps<T extends keyof InventoryStackParamsList> = {
    route: RouteProp<InventoryStackParamsList, T>
}

export default InventoryStackParamsList
