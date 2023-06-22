import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { NavBar, ProgressBar } from '../../components'
import syncingStyles from './syncing.styels'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import RootStackParamsList from '../../navigations/RootStackParamsList'
import { saveItem, removeItem } from '../../helpers/AsyncStorage'
import { Product } from '../../@types'
import { getProducts } from '../../controllers/ProductsController'

const Syncing = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const syncData = async () => {
            await removeItem('Products')

            try {
                const products: Product[] = (await getProducts()) || []

                const totalProducts: number = products.length
                let syncedProducts = 0

                await saveItem<Product[]>(`Products`, products)

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                products.forEach((_product: Product) => {
                    syncedProducts += 1
                    setProgress((syncedProducts / totalProducts) * 100)
                })

                syncedProducts === totalProducts && syncedProducts < 100 && setProgress(100)

                setTimeout(() => {
                    navigation.navigate('BottomTabs')
                }, 1000)
            } catch (error) {
                console.log(error)
            }
        }

        syncData()
    }, [])

    return (
        <SafeAreaView testID="SyncingScreen">
            <ScrollView style={syncingStyles.screenContainer}>
                <NavBar />

                <View style={syncingStyles.centeredImageContainer}>
                    <Image source={require('../../assets/images/syncing.png')} style={syncingStyles.centeredImage} />
                </View>

                <ProgressBar progress={progress} />

                <View style={syncingStyles.bottomContent}>
                    <Text style={syncingStyles.boldText}>Synchronisation en cours …</Text>
                    <Text style={syncingStyles.lightText}>
                        Nous sommes entrain de mettre à jour votre base de données, Veuillez patienter quelques instants
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Syncing
