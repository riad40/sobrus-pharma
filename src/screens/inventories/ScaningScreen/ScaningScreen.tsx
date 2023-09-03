import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, Pressable } from 'react-native'

import { BarCodeReadEvent } from 'react-native-camera'

import Ionicons from 'react-native-vector-icons/Ionicons'
import scanningStyles from './scanning.styles'
import { SearchProducts, CreateProductModal, QrcodeScanner, ProductExistAlert } from '../../../components'

import InventoryStackParamsList, {
    InventoryStackNavProps
} from '../../../navigations/stacks/InventoryStack/InventoryStackParamsList'
import { useNavigation, NavigationProp } from '@react-navigation/native'

import requestAccessCameraPermission from '../../../helpers/Permissions/cameraPermession'

import { Product } from '../../../@types'

import { addProductsToInventory, getInventoryProduct } from '../../../controllers/InventoriesController'
import { createUnknownProducts } from '../../../controllers/ProductsController'

import realm, { getNextProductId } from '../../../configs/realm'

// @types
interface ScaningScreenProps {
    route: InventoryStackNavProps<'ScanningScreen'>['route']
}

type ProductData = { codeBar: string; name: string; quantity: number; status: string }

type modalsVisible = {
    createProductModal: boolean
    searchProductsModal: boolean
    productExistAlert: boolean
}

type IsProductExist = { name: string; quantity: number; isProductExist?: boolean }

const ScaningScreen = ({ route }: ScaningScreenProps): JSX.Element => {
    const { id } = route.params

    const navigation = useNavigation<NavigationProp<InventoryStackParamsList>>()

    const [hasPermission, setHasPermission] = useState<boolean>(false)

    const [isUnknownProduct, setIsUnknownProduct] = useState<boolean>(false)

    const [isProductExist, setIsProductExist] = useState<IsProductExist>({
        name: '',
        quantity: 0,
        isProductExist: false
    })

    const [error, setError] = useState<{ name: string; quantity: string }>({ name: '', quantity: '' })

    const [modalsVisible, setModalsVisible] = useState<modalsVisible>({
        createProductModal: false,
        searchProductsModal: false,
        productExistAlert: false
    })

    const [selectedOption, setSelectedOption] = useState<string>('replace')

    const [productsData, setProductsData] = useState<ProductData>({ codeBar: '', name: '', quantity: 0, status: '' })

    const checkPermission = async () => {
        const permission = await requestAccessCameraPermission()
        setHasPermission(permission)
    }

    const handleSaveProduct = () => {
        const { codeBar, name, quantity } = productsData

        // check if name is empty and set error message
        if (!name || name === '') {
            setError({ ...error, name: 'Le nom est obligatoire' })
            return
        }

        // check if quantity is empty and set error message
        if (!quantity || quantity === 0 || typeof quantity == 'string') {
            setError({ ...error, quantity: 'La valeur est invalide ou obligatoire' })
            return
        }

        setModalsVisible({ ...modalsVisible, createProductModal: false })

        if (isUnknownProduct) handleAddUnknownProduct()

        if (isProductExist.isProductExist) {
            setModalsVisible({ ...modalsVisible, createProductModal: true })

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
        } else {
            addProductsToInventory(id, [productsData])
        }

        navigation.navigate('InventoryDetails', { inventoryId: id })
    }

    const handleProductSelected = (product: Product) => {
        setModalsVisible({ ...modalsVisible, searchProductsModal: false, createProductModal: true })

        const { codeBar, name, status } = product

        const productExist = getInventoryProduct(id, codeBar)

        if (productExist) {
            const { name, codeBar, quantity, status } = productExist

            setProductsData({ name, codeBar, quantity: 0, status })

            setModalsVisible({ ...modalsVisible, productExistAlert: true })

            setIsProductExist({ name, quantity, isProductExist: true })

            return
        }

        setProductsData({ codeBar, name, quantity: productsData.quantity, status })
    }

    const handleAddUnknownProduct = () => {
        const { codeBar, name, status } = productsData

        createUnknownProducts({ id: getNextProductId(realm), codeBar, name, status })
    }

    const handleQRCodeScanned = (e: BarCodeReadEvent) => {
        const codeBar = e.data

        const product = realm.objects<Product>('Product').filtered(`codeBar = "${codeBar}"`)[0]

        // check if product exist in inventory
        const productExist = getInventoryProduct(id, codeBar)

        if (productExist) {
            const { name, codeBar, quantity, status } = productExist

            setProductsData({ name, codeBar, quantity: 0, status })

            setModalsVisible({ ...modalsVisible, productExistAlert: true })

            setIsProductExist({ name, quantity, isProductExist: true })

            return
        }

        setModalsVisible({ ...modalsVisible, createProductModal: true })

        setProductsData({ codeBar, name: product?.name || '', quantity: 0, status: product?.status || 'unknown' })

        setIsUnknownProduct(!product)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            checkPermission()

            setIsUnknownProduct(false)
            setIsProductExist({ name: '', quantity: 0, isProductExist: false })
            setError({ name: '', quantity: '' })
            setModalsVisible({ createProductModal: false, searchProductsModal: false, productExistAlert: false })
            setProductsData({ codeBar: '', name: '', quantity: 0, status: '' })
        })

        return unsubscribe
    }, [])

    return (
        <SafeAreaView>
            {hasPermission ? (
                <>
                    {!modalsVisible.createProductModal && !modalsVisible.searchProductsModal ? (
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

                    {!modalsVisible.createProductModal && !modalsVisible.searchProductsModal && (
                        <QrcodeScanner
                            cameraActive
                            setCameraActive={() => {
                                console.log('setCameraActive')
                            }}
                            handleQRCodeScanned={handleQRCodeScanned}
                        />
                    )}

                    <ProductExistAlert
                        product={isProductExist}
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
                        codeBar={productsData.codeBar?.toString()}
                        name={productsData.name}
                        quantity={productsData.quantity}
                        onProductChange={(value: string) => {
                            setProductsData({ ...productsData, name: value })
                            setError({ ...error, name: '' })
                        }}
                        onQuantityChange={(value: number) => {
                            setProductsData({ ...productsData, quantity: value })
                            setError({ ...error, quantity: '' })
                        }}
                        onSave={handleSaveProduct}
                        error={error}
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
