import React from 'react'
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { Header, ProductCard } from '../../../components'

import { InventoryProducts } from '../../../@types'

interface UnknownProductsProps {
    route: { params: { products: InventoryProducts[] } }
}

const UnknownProducts = ({ route }: UnknownProductsProps): JSX.Element => {
    const { products } = route.params

    return (
        <>
            <SafeAreaView>
                <Header title="Produits inconnus" icon height={100} />

                <View style={styles.startView} />
                <View style={styles.container}>
                    <FlatList
                        data={products}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <ProductCard product={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    startView: {
        position: 'absolute',
        top: hp(9),
        zIndex: 9999,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        backgroundColor: '#f2f2f2',
        paddingVertical: hp(1.5),
        width: '100%'
    },
    container: {
        paddingHorizontal: wp(5)
    }
})

export default UnknownProducts
