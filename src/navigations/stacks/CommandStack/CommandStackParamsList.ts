import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

type CommandStackParamsList = {
    Commands: undefined
}

type CommandScreenNavigationProp = StackNavigationProp<CommandStackParamsList, 'Commands'>

type CommandScreenRouteProp = RouteProp<CommandStackParamsList, 'Commands'>

export type CommandProps = {
    navigation: CommandScreenNavigationProp
    route: CommandScreenRouteProp
}

export default CommandStackParamsList
