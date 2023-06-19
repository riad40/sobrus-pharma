import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type HomeStackParamsList = {
    Home: undefined
}

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamsList, 'Home'>

type HomeScreenRouteProp = RouteProp<HomeStackParamsList, 'Home'>

export type HomeProps = {
    navigation: HomeScreenNavigationProp
    route: HomeScreenRouteProp
}

export default HomeStackParamsList
