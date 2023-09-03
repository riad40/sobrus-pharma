import { RouteProp } from '@react-navigation/native'

type MenuStackParamsList = {
    Menu: undefined
    ProductsList: undefined
    ProductDetails: { id: number | string }
}

export type MenuStackNavProps<T extends keyof MenuStackParamsList> = {
    route: RouteProp<MenuStackParamsList, T>
}

export default MenuStackParamsList
