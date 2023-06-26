import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../../constants/colors'
import { tabInfos } from '../../constants/tabInfos'

type TabViewProps = {
    focused: boolean
    label: string
    key: number
}

const TabView = ({ focused, label, key }: TabViewProps): JSX.Element => {
    const iconName = tabInfos[label].iconName

    label = tabInfos[label].label

    return (
        <>
            <View style={tabViewStyels.container} key={key}>
                <Ionicons
                    name={iconName}
                    size={25}
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
        width: Dimensions.get('window').width / 5,
        marginTop: 5
    },
    label: {
        color: colors.secondary,
        textTransform: 'uppercase',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 11,
        textAlign: 'center'
    }
})

export default TabView
