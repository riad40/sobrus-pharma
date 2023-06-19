import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type MenuStackParamsList = {
    Menu: undefined
}

type MenuScreenNavigationProp = StackNavigationProp<MenuStackParamsList, 'Menu'>

type MenuScreenRouteProp = RouteProp<MenuStackParamsList, 'Menu'>

export type MenuProps = {
    navigation: MenuScreenNavigationProp
    route: MenuScreenRouteProp
}

export default MenuStackParamsList
