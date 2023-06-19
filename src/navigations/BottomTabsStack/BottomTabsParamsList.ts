import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { RouteProp } from '@react-navigation/native'

type BottomTabsParamsList = {
    HomeStack: undefined
    OffersStack: undefined
    CommandsStack: undefined
    InventoriesStack: undefined
    MenuStack: undefined
}

export type BottomTabsProps<T extends keyof BottomTabsParamsList> = {
    navigation: BottomTabNavigationProp<BottomTabsParamsList, T>
    route: RouteProp<BottomTabsParamsList, T>
}

export default BottomTabsParamsList
