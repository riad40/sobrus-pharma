import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Image, Text } from 'react-native'

import productDetailsStyles from './productDetails.styles'
import { ScreenContainer } from '../../../../components'

import { Product } from '../../../../@types'

import realm from '../../../../configs/realm'

// @types
interface ProductDetailsProps {
    route: { params: { id: number } }
}

const ProductsList = ({ route }: ProductDetailsProps): JSX.Element => {
    const { id } = route.params

    const [product, setProduct] = useState<Product>({} as Product)

    useEffect(() => {
        const product = realm.objects<Product>('Product').filtered(`id = "${id}"`)[0]

        setProduct(product)
    }, [])

    return (
        <SafeAreaView>
            <ScreenContainer title="Détails du produit" icon>
                <View style={productDetailsStyles.container}>
                    <View style={productDetailsStyles.imageContainer}>
                        <Image source={require('../../../../assets/images/pill.png')} />
                    </View>

                    <Text style={productDetailsStyles.heading}>Informations du produit</Text>

                    <View style={productDetailsStyles.infoContainer}>
                        <View style={productDetailsStyles.info}>
                            <Text style={productDetailsStyles.infoText}>ID Produit</Text>
                            <Text style={productDetailsStyles.infoText}>{product.id}</Text>
                        </View>

                        <View style={productDetailsStyles.info}>
                            <Text style={productDetailsStyles.infoText}>Nom du produit</Text>
                            <Text style={productDetailsStyles.infoText}>{product.name}</Text>
                        </View>

                        <View style={productDetailsStyles.info}>
                            <Text style={productDetailsStyles.infoText}>Code barre</Text>
                            <Text style={productDetailsStyles.infoText}>{product.codeBar}</Text>
                        </View>
                    </View>
                </View>
            </ScreenContainer>
        </SafeAreaView>
    )
}

export default ProductsList
