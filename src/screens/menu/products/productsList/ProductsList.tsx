import React, { useMemo, useState } from 'react'
import { SafeAreaView, FlatList, View, TouchableOpacity, Image, Text } from 'react-native'

import productsListStyles from './products.styles'
import { ScreenContainer, SearchBar, QrcodeScanner } from '../../../../components'

import { BarCodeReadEvent } from 'react-native-camera'

import { Product } from '../../../../@types'

import realm from '../../../../configs/realm'

import Modal from 'react-native-modal'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import MenuStackParamsList from '../../../../navigations/stacks/MenuStack/MenuStackParamsList'

const ProductsList = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<MenuStackParamsList>>()

    const products = Array.from(realm.objects<Product>('Product'))

    const [search, setSearch] = useState('')

    const [modalVisible, setModalVisible] = useState(false)

    const productsList = useMemo(() => {
        return products.filter(product => {
            return product.name.toLowerCase().includes(search.toLowerCase()) || product.codeBar.includes(search)
        })
    }, [products, search])

    const handleScan = (e: BarCodeReadEvent) => {
        const codeBar = e.data
        setSearch(codeBar)
        setModalVisible(false)
    }

    return (
        <SafeAreaView>
            <ScreenContainer
                title=""
                icon
                element={<SearchBar scanPressed={() => setModalVisible(true)} search={search} setSearch={setSearch} />}
            >
                <View style={productsListStyles.container}>
                    <FlatList
                        data={productsList}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={productsListStyles.productContainer}
                                onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
                            >
                                <View>
                                    <Text style={productsListStyles.productName}>{item.name}</Text>
                                    <Text style={productsListStyles.lightText}>Accédé à la fiche produit</Text>
                                </View>
                                <Image source={require('../../../../assets/images/pill.png')} />
                            </TouchableOpacity>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScreenContainer>

            <Modal isVisible={modalVisible} style={{ margin: 0 }}>
                <QrcodeScanner
                    handleQRCodeScanned={handleScan}
                    cameraActive={true}
                    setCameraActive={() => console.log('setCameraActive')}
                    modalMode={modalVisible}
                    setModalMode={setModalVisible}
                />
            </Modal>
        </SafeAreaView>
    )
}

export default ProductsList
