import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type InventoryStackParamsList = {
    InventoriesList: undefined
    InventoryDetails: { inventoryId: string }
}

type InventoriesListScreenNavigationProp = StackNavigationProp<InventoryStackParamsList, 'InventoriesList'>

type InventoriesListScreenRouteProp = RouteProp<InventoryStackParamsList, 'InventoriesList'>

type InventoryDetailsScreenNavigationProp = StackNavigationProp<InventoryStackParamsList, 'InventoryDetails'>

type InventoryDetailsScreenRouteProp = RouteProp<InventoryStackParamsList, 'InventoryDetails'>

export type InventoriesListProps = {
    navigation: InventoriesListScreenNavigationProp
    route: InventoriesListScreenRouteProp
}

export type InventoryDetailsProps = {
    navigation: InventoryDetailsScreenNavigationProp
    route: InventoryDetailsScreenRouteProp
}

export default InventoryStackParamsList
