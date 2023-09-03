import React, { useState } from 'react'
import { FlatList, View, Text, StyleSheet, Pressable, Image } from 'react-native'

import { ModalContainer, CustomTextInput } from '../'

import { Product } from '../../@types'

import colors from '../../constants/colors'
import { FONT_SIZE_14, FONT_SIZE_18 } from '../../constants/fontsSizes'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import Ionicons from 'react-native-vector-icons/Ionicons'

import realm from '../../configs/realm'

interface SearchProductsProps {
    visible: boolean
    onClose: () => void
    onProductSelect: (product: Product) => void
}

const SearchProducts = ({ visible, onClose, onProductSelect }: SearchProductsProps): JSX.Element => {
    const [search, setSearch] = useState<string>('')

    const products = Array.from(realm.objects<Product>('Product'))

    const renderProduct = ({ item }: { item: Product }) => (
        <Pressable style={styles.productContainer} onPress={() => onProductSelect(item)}>
            <Text style={styles.productName}>{item.name}</Text>
            <Image source={require('../../assets/images/pill.png')} />
        </Pressable>
    )

    return (
        <ModalContainer visible={visible} onClose={onClose} style={{ backgroundColor: '#eee', modalHeight: '90%' }}>
            <Pressable onPress={onClose}>
                <View style={styles.closeModalLine} />
            </Pressable>
            <View style={styles.inputContainer}>
                <Pressable style={styles.topContent}>
                    <Ionicons name="search" size={20} color="black" />

                    <CustomTextInput
                        placeholder="Rechercher un produit"
                        value={search}
                        onChangeText={value => setSearch(value)}
                    />
                </Pressable>
            </View>
            {search.length > 0 ? (
                <FlatList
                    data={products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))}
                    renderItem={renderProduct}
                    keyExtractor={item => item.id.toString()}
                />
            ) : (
                <View style={styles.noSearch}>
                    <Image source={require('../../assets/images/loupe(3).png')} style={{ resizeMode: 'contain' }} />
                    <Text style={styles.noSearchText}>Merci de taper le nom du produit que vous souhaitez ajouter</Text>
                </View>
            )}
        </ModalContainer>
    )
}

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: FONT_SIZE_18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: hp(2)
    },

    inputContainer: {
        marginBottom: hp(2)
    },

    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(1),
        paddingHorizontal: wp(3.5),
        paddingVertical: hp(1.5),
        backgroundColor: '#fff',
        borderRadius: 10
    },

    productName: {
        fontSize: FONT_SIZE_14,
        textTransform: 'uppercase',
        color: '#000',
        fontWeight: '800'
    },

    closeModalLine: {
        width: wp(15),
        height: hp(0.5),
        backgroundColor: colors.secondary,
        borderRadius: 10,
        marginVertical: hp(1),
        alignSelf: 'center'
    },

    noSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(10)
    },

    noSearchText: {
        marginTop: hp(2),
        fontSize: FONT_SIZE_14,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        width: '80%'
    },

    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: wp(2)
    },

    topContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(5),
        backgroundColor: colors.white,
        borderRadius: wp(20),
        width: '90%',
        alignSelf: 'center',
        marginVertical: hp(2)
    }
})

export default SearchProducts
