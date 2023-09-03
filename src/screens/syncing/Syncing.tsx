import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'

import syncingStyles from './syncing.styels'
import { NavBar, ProgressBar } from '../../components'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import RootStackParamsList from '../../navigations/RootStackParamsList'

import { getProducts } from '../../controllers/ProductsController'

import realm from '../../configs/realm'

import { Product } from '../../@types'

console.log('Syncing screen loaded')

const Syncing = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()

    const [progress, setProgress] = useState(0)

    const syncData = async () => {
        try {
            const products: Product[] = (await getProducts()) || []

            realm.write(() => {
                products.forEach(product => {
                    const existingProduct = realm.objectForPrimaryKey('Product', product.id)

                    if (existingProduct) return

                    realm.create('Product', {
                        id: product.id,
                        name: product.name,
                        codeBar: product.codeBar.toString(),
                        status: 'known'
                    })
                })
            })

            setProgress(100)

            setTimeout(() => {
                navigation.navigate('BottomTabs')
            }, 1000)
        } catch (error) {
            console.log('syncing error', error)
        }
    }

    useEffect(() => {
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
