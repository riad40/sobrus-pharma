import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type OfferStackParamsList = {
    Offers: undefined
}

type OfferScreenNavigationProp = StackNavigationProp<OfferStackParamsList, 'Offers'>

type OfferScreenRouteProp = RouteProp<OfferStackParamsList, 'Offers'>

export type OfferProps = {
    navigation: OfferScreenNavigationProp
    route: OfferScreenRouteProp
}

export default OfferStackParamsList
