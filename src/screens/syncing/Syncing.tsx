import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { NavBar } from '../../components'
import syncingStyles from './syncing.styels'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import RootStackParamsList from '../../navigations/RootStackParamsList'
import AnimatedProgress from '../../components/common/ProgressBar'

const Syncing = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()

    const progress = 63

    useEffect(() => {
        const unscribe = navigation.addListener('focus', () => {
            navigation.navigate('BottomTabs')
        })
        return unscribe
    }, [])

    return (
        <SafeAreaView testID="SyncingScreen">
            <ScrollView style={syncingStyles.screenContainer}>
                <NavBar />
                <View style={syncingStyles.centeredImageContainer}>
                    <Image source={require('../../assets/images/syncing.png')} style={syncingStyles.centeredImage} />
                </View>
                <AnimatedProgress progress={progress} />

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
