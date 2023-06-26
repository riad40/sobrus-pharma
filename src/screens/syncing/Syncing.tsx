import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'

import { NavBar, ProgressBar } from '../../components'

import syncingStyles from './syncing.styels'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import RootStackParamsList from '../../navigations/RootStackParamsList'

import { saveItem, removeItem } from '../../helpers/AsyncStorage'
import { getProducts } from '../../controllers/ProductsController'

import { Product } from '../../@types'

const Syncing = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const syncData = async () => {
            await removeItem('Products')

            try {
                const products: Product[] = (await getProducts()) || []

                await saveItem<Product[]>(`Products`, products)

                setProgress(100)

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
