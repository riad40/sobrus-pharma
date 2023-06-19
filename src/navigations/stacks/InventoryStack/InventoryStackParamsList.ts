import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type InventoryStackParamsList = {
    InventoriesList: undefined
    InventoryDetails: { inventoryId: string }
    ScaningScreen: { inventoryId: string }
}

type InventoriesListScreenNavigationProp = StackNavigationProp<InventoryStackParamsList, 'InventoriesList'>

type InventoriesListScreenRouteProp = RouteProp<InventoryStackParamsList, 'InventoriesList'>

type InventoryDetailsScreenNavigationProp = StackNavigationProp<InventoryStackParamsList, 'InventoryDetails'>

type InventoryDetailsScreenRouteProp = RouteProp<InventoryStackParamsList, 'InventoryDetails'>

type ScaningScreenNavigationProp = StackNavigationProp<InventoryStackParamsList, 'ScaningScreen'>

type ScaningScreenRouteProp = RouteProp<InventoryStackParamsList, 'ScaningScreen'>

export type InventoriesListProps = {
    navigation: InventoriesListScreenNavigationProp
    route: InventoriesListScreenRouteProp
}

export type InventoryDetailsProps = {
    navigation: InventoryDetailsScreenNavigationProp
    route: InventoryDetailsScreenRouteProp
}

export type ScaningScreenProps = {
    navigation: ScaningScreenNavigationProp
    route: ScaningScreenRouteProp
}

export default InventoryStackParamsList
