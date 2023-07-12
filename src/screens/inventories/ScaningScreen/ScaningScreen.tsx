import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, Pressable } from 'react-native'

import { BarCodeReadEvent } from 'react-native-camera'

import Ionicons from 'react-native-vector-icons/Ionicons'
import scanningStyles from './scanning.styles'
import { SearchProducts, CreateProductModal, SuccessAlert, ProductExistAlert, QrcodeScanner } from '../../../components'

import InventoryStackParamsList from '../../../navigations/stacks/InventoryStack/InventoryStackParamsList'
import { useNavigation, NavigationProp } from '@react-navigation/native'

import requestAccessCameraPermission from '../../../helpers/Permissions/cameraPermession'

import { Product } from '../../../@types'

import { addProductsToInventory, getInventoryProduct } from '../../../controllers/InventoriesController'
import { createUnknownProducts } from '../../../controllers/ProductsController'

import realm, { getNextProductId } from '../../../configs/realm'

// @types
interface ScaningScreenProps {
    route: { params: { id: number } }
}

type ProductData = { codeBar: string; name: string; quantity: number; status: string }

type modalsVisible = {
    createProductModal: boolean
    searchProductsModal: boolean
    successAlert: boolean
    productExistAlert: boolean
}

const ScaningScreen = ({ route }: ScaningScreenProps): JSX.Element => {
    const { id } = route.params

    const navigation = useNavigation<NavigationProp<InventoryStackParamsList>>()

    const [hasPermission, setHasPermission] = useState<boolean>(false)

    const [cameraActive, setCameraActive] = useState<boolean>(true)

    const [isUnknownProduct, setIsUnknownProduct] = useState<boolean>(false)

    const [isProductExist, setIsProductExist] = useState<boolean>(false)

    const [modalsVisible, setModalsVisible] = useState<modalsVisible>({
        createProductModal: false,
        searchProductsModal: false,
        successAlert: false,
        productExistAlert: false
    })

    const [selectedOption, setSelectedOption] = useState<string>('replace')

    const [productsData, setProductsData] = useState<ProductData>({
        codeBar: '',
        name: '',
        quantity: 0,
        status: ''
    })

    const [inventoryProducts, setInventoryProducts] = useState<ProductData[]>([])

    const checkPermission = async () => {
        const permission = await requestAccessCameraPermission()
        setHasPermission(permission)
    }

    const handleSaveProduct = () => {
        const { codeBar, name, quantity, status } = productsData

        setModalsVisible({ ...modalsVisible, successAlert: true, createProductModal: false })

        setInventoryProducts([...inventoryProducts, { codeBar, name, quantity, status: status }])

        if (isUnknownProduct) handleAddUnknownProduct()

        if (isProductExist) {
            setModalsVisible({ ...modalsVisible, successAlert: false, createProductModal: false })

            const product = getInventoryProduct(id, codeBar)

            if (selectedOption === 'replace') {
                realm.write(() => {
                    product.quantity = quantity
                })
            } else if (selectedOption === 'add') {
                realm.write(() => {
                    product.quantity = product.quantity + quantity
                })
            }

            navigation.navigate('InventoryDetails', { inventoryId: id })
        }
    }

    const handleProductSelected = (product: Product) => {
        setModalsVisible({ ...modalsVisible, searchProductsModal: false, createProductModal: true })

        const { codeBar, name, status } = product

        const productExist = getInventoryProduct(id, codeBar)

        if (productExist) {
            const { name, codeBar, quantity, status } = productExist

            setProductsData({ name, codeBar, quantity, status })

            setModalsVisible({ ...modalsVisible, productExistAlert: true })

            setCameraActive(false)

            setIsProductExist(true)

            return
        }

        setProductsData({ codeBar, name, quantity: productsData.quantity, status })
    }

    const handleAddUnknownProduct = () => {
        const { codeBar, name, status } = productsData

        createUnknownProducts({ id: getNextProductId(realm), codeBar, name, status })
    }

    const saveProductsToInventory = () => {
        addProductsToInventory(id, inventoryProducts)

        setModalsVisible({ ...modalsVisible, successAlert: false })

        setInventoryProducts([])
    }

    const handleQRCodeScanned = (e: BarCodeReadEvent) => {
        const codeBar = e.data

        const product = realm.objects<Product>('Product').filtered(`codeBar = "${codeBar}"`)[0]

        console.log(product)

        // check if product exist in inventory
        const productExist = getInventoryProduct(id, codeBar)

        if (productExist) {
            const { name, codeBar, quantity, status } = productExist

            setProductsData({ name, codeBar, quantity, status })

            setModalsVisible({ ...modalsVisible, productExistAlert: true })

            setCameraActive(false)

            setIsProductExist(true)

            return
        }

        setModalsVisible({ ...modalsVisible, createProductModal: true })

        setProductsData({ codeBar, name: product?.name || '', quantity: 0, status: product?.status || 'unknown' })

        setIsUnknownProduct(!product)

        setCameraActive(false)
    }

    useEffect(() => {
        const unscribe = navigation.addListener('focus', () => {
            checkPermission()
        })

        return unscribe
    }, [])

    return (
        <SafeAreaView>
            {hasPermission ? (
                <>
                    {cameraActive ? (
                        <Pressable
                            style={scanningStyles.topContent}
                            onPress={() => setModalsVisible({ ...modalsVisible, searchProductsModal: true })}
                        >
                            <Ionicons name="search" size={20} color="black" />
                            <Text style={scanningStyles.topContentInput}>Rechercher produits</Text>
                        </Pressable>
                    ) : null}

                    <SearchProducts
                        onProductSelect={handleProductSelected}
                        visible={modalsVisible.searchProductsModal}
                        onClose={() => setModalsVisible({ ...modalsVisible, searchProductsModal: false })}
                    />

                    <QrcodeScanner
                        cameraActive={cameraActive}
                        setCameraActive={setCameraActive}
                        handleQRCodeScanned={handleQRCodeScanned}
                    />

                    <ProductExistAlert
                        product={productsData}
                        visible={modalsVisible.productExistAlert}
                        onClose={() => setModalsVisible({ ...modalsVisible, productExistAlert: false })}
                        selectedOption={selectedOption}
                        onOptionSelected={option => {
                            setSelectedOption(option)
                            setModalsVisible({ ...modalsVisible, productExistAlert: false, createProductModal: true })
                        }}
                    />

                    <CreateProductModal
                        visible={modalsVisible.createProductModal}
                        onClose={() => setModalsVisible({ ...modalsVisible, createProductModal: false })}
                        codeBar={productsData.codeBar.toString()}
                        name={productsData.name}
                        quantity={productsData.quantity}
                        onProductChange={(value: string) => setProductsData({ ...productsData, name: value })}
                        onQuantityChange={(value: number) => setProductsData({ ...productsData, quantity: value })}
                        onSave={handleSaveProduct}
                    />

                    <SuccessAlert
                        visible={modalsVisible.successAlert}
                        onClose={() => setModalsVisible({ ...modalsVisible, successAlert: false })}
                        message="Produit ajouté avec succès"
                        onContinue={saveProductsToInventory}
                        onQuit={() => {
                            saveProductsToInventory()
                            navigation.navigate('InventoryDetails', { inventoryId: id })
                        }}
                    />
                </>
            ) : (
                <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    Vous devez autoriser l &apos; accès à la caméra
                </Text>
            )}
        </SafeAreaView>
    )
}
export default ScaningScreen
