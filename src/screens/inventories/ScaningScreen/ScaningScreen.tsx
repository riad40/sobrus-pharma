import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TextInput } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'

import { BottomContent } from '../../../components'

import InventoryStackParamsList from '../../../navigations/stacks/InventoryStack/InventoryStackParamsList'
import scanningStyles from './scanning.styles'

import { getItem } from '../../../helpers/AsyncStorage'
import requestAccessCameraPermission from '../../../helpers/Permissions/cameraPermession'

import { CreateProductModal, SuccessAlert } from '../../../components'
import { Inventory, Product } from '../../../@types'

import { createInventory } from '../../../controllers/InventoriesController'

// @types
interface ScaningScreenProps {
    route: { params: { data: { date: string; reason: string } } }
}

interface ProductDataType {
    codeBar?: string
    productName?: string
    quantity?: number
}

const ScaningScreen = ({ route }: ScaningScreenProps): JSX.Element => {
    const { date, reason } = route.params.data

    const navigation = useNavigation<NavigationProp<InventoryStackParamsList>>()

    const [hasPermission, setHasPermission] = useState<boolean>(false)

    const [flashMode, setFlashMode] = useState<boolean>(false)

    const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState<boolean>(false)

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const [products, setProducts] = useState<Product[]>([])

    const [productsData, setProductsData] = useState<ProductDataType>({ codeBar: '', productName: '', quantity: 0 })

    const [inventoryProducts, setInventoryProducts] = useState<ProductDataType[]>([])

    const checkPermission = async () => {
        const permission = await requestAccessCameraPermission()
        setHasPermission(permission)
    }

    const getProducts = async () => {
        const products = await getItem('Products')
        if (products !== null) {
            setProducts(JSON.parse(products))
        }
    }

    const handleSaveProduct = () => {
        setIsModalVisible(false)

        const productData = {
            productName: productsData.productName,
            quantity: productsData.quantity
        }

        setInventoryProducts([...inventoryProducts, productData])

        setIsSuccessAlertVisible(true)
    }

    const handleContinue = () => {
        setIsSuccessAlertVisible(false)

        setProductsData({ codeBar: '', productName: '', quantity: 0 })
    }

    const handleQuit = async () => {
        setIsSuccessAlertVisible(false)

        const inventoryData: Inventory = {
            date: date,
            reason: reason,
            products: inventoryProducts,
            status: 'ouvert',
            id: Math.random()
        } as Inventory

        await createInventory(inventoryData)

        navigation.navigate('InventoriesList')
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleQRCodeScanned = (e: any) => {
        const codeBar = e.data
        const product = products.find(product => product.barcode === codeBar.toString())

        if (product !== undefined) {
            const { barcode, name } = product
            setProductsData({ codeBar: barcode, productName: name })
            setIsModalVisible(true)
        }
    }

    useEffect(() => {
        checkPermission()
        getProducts()
    }, [])

    return (
        <SafeAreaView>
            {hasPermission ? (
                <>
                    <View style={scanningStyles.topContent}>
                        <Ionicons name="search" size={20} color="black" />
                        <TextInput style={scanningStyles.topContentInput} placeholder="Rechercher produits" />
                    </View>
                    <View style={scanningStyles.container}>
                        <QRCodeScanner
                            onRead={handleQRCodeScanned}
                            cameraStyle={scanningStyles.cameraStyle}
                            reactivate={true}
                            reactivateTimeout={3000}
                            showMarker={true}
                            flashMode={
                                flashMode ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off
                            }
                            customMarker={<View style={scanningStyles.customMarker} />}
                            bottomContent={
                                <BottomContent flashMode={flashMode} setFlashMode={() => setFlashMode(!flashMode)} />
                            }
                            cameraProps={{ ratio: '16:9', captureAudio: false }}
                        />
                    </View>

                    <CreateProductModal
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        codeBar={productsData.codeBar as string}
                        productName={productsData.productName}
                        onSave={handleSaveProduct}
                        onProductChange={(value: string) => setProductsData({ ...productsData, productName: value })}
                        onQuantityChange={(value: number) => setProductsData({ ...productsData, quantity: value })}
                    />

                    <SuccessAlert
                        visible={isSuccessAlertVisible}
                        message="Produit ajouté avec succès"
                        onClose={() => {
                            setIsSuccessAlertVisible(false)
                        }}
                        onContinue={() => {
                            handleContinue()
                        }}
                        onQuit={() => {
                            handleQuit()
                        }}
                    />
                </>
            ) : (
                <Text>Vous devez autoriser l &apos accès à la caméra</Text>
            )}
        </SafeAreaView>
    )
}
export default ScaningScreen
