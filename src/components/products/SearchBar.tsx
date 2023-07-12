import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../../constants/colors'
import { CustomTextInput } from '../'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

interface SearchBarProps {
    scanPressed: () => void
    search: string
    setSearch: (value: string) => void
}

const SearchBar = ({ scanPressed, search, setSearch }: SearchBarProps): JSX.Element => {
    return (
        <View style={styles.container}>
            <View style={styles.searchInputContainer}>
                <CustomTextInput
                    placeholder="Rechercher un produit"
                    value={search}
                    onChangeText={value => setSearch(value)}
                />

                <Ionicons name="search-sharp" size={20} color="black" />
            </View>

            <TouchableOpacity style={styles.scanContainer} onPress={scanPressed}>
                <MaterialCommunityIcons
                    name="credit-card-scan-outline"
                    size={20}
                    color="#000"
                    style={styles.scanIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    scanContainer: {
        backgroundColor: '#fff',
        height: hp(5),
        width: wp(10),
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    scanIcon: {
        alignSelf: 'center'
    },

    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp(2),
        backgroundColor: colors.white,
        borderRadius: 50,
        width: '80%',
        height: hp(4.8),
        marginLeft: wp(1.5)
    },

    searchInputText: {
        width: '90%',
        height: hp(6),
        paddingLeft: wp(2)
    }
})

export default SearchBar
