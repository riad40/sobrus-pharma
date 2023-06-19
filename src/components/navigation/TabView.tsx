import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import AntDesign from 'react-native-vector-icons/Ionicons'
import colors from '../../constants/colors'

type TabViewProps = {
    focused: boolean
    label: string
    key: number
}

const TabView = ({ focused, label, key }: TabViewProps): JSX.Element => {
    const icons: { [key: string]: string } = {
        HomeStack: 'home-outline',
        InventoriesStack: 'albums-outline',
        OffersStack: 'pricetags-outline',
        MenuStack: 'menu-outline',
        CommandsStack: 'cart-outline'
    }

    const iconName = icons[label]

    const labels: { [key: string]: string } = {
        HomeStack: 'Acceuil',
        InventoriesStack: 'Inventaires',
        OffersStack: 'Offres',
        MenuStack: 'Menu',
        CommandsStack: 'Commands'
    }

    label = labels[label]

    return (
        <>
            <View style={tabViewStyels.container} key={key}>
                <AntDesign
                    name={iconName}
                    size={30}
                    color={focused ? colors.primary : colors.secondary}
                    style={{ color: focused ? colors.primary : colors.secondary }}
                />
                <Text style={[tabViewStyels.label, { color: focused ? colors.primary : colors.secondary }]}>
                    {label}
                </Text>
            </View>
        </>
    )
}

const tabViewStyels = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: Dimensions.get('window').width / 5
    },
    label: {
        fontSize: 14,
        color: colors.secondary,
        fontWeight: '700'
    }
})

export default TabView
