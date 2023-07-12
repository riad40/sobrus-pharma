import React from 'react'
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'

import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { ScreenContainer, ProductCard } from '../../../components'

import { InventoryProducts } from '../../../@types'

interface UnknownProductsProps {
    route: { params: { products: InventoryProducts[] } }
}

const UnknownProducts = ({ route }: UnknownProductsProps): JSX.Element => {
    const { products } = route.params

    return (
        <>
            <SafeAreaView>
                <ScreenContainer title="Produits inconnus" icon>
                    <View style={styles.container}>
                        <FlatList
                            data={products}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <ProductCard product={item} />}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ScreenContainer>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        backgroundColor: '#f2f2f2',
        paddingHorizontal: wp(2),
        paddingVertical: wp(6),
        width: '100%'
    }
})

export default UnknownProducts
