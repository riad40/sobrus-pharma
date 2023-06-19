import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import { NavBar, Button } from '../../components'
import toConnectStyles from './ToConnect.styles'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import RootStackParamsList from '../../navigations/RootStackParamsList'

const ToConnect = (): JSX.Element => {
    const [disabled, setDisabled] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const navigation = useNavigation<NavigationProp<RootStackParamsList>>()

    const onPress = () => {
        setDisabled(true)
        setLoading(true)
        setTimeout(() => {
            navigation.navigate('Syncing')
        }, 2000)
    }

    useEffect(() => {
        const unscribe = navigation.addListener('focus', () => {
            setDisabled(false)
            setLoading(false)
        })
        return unscribe
    }, [])

    return (
        <SafeAreaView>
            <ScrollView style={toConnectStyles.screenContainer}>
                <NavBar />
                <View style={toConnectStyles.centeredImageContainer}>
                    <Image
                        testID="toConnectImage"
                        source={require('../../assets/images/toConnectImg.png')}
                        style={toConnectStyles.centeredImage}
                    />
                </View>
                <View style={toConnectStyles.bottomContent}>
                    <Text style={toConnectStyles.boldText}>Le logiciel qu’il vous faut</Text>
                    <Text style={toConnectStyles.lightText}>
                        Sobrus Pharma est un logiciel développé pour vous apporter une meilleure gestion de votre
                        officine.
                    </Text>
                </View>
                <Button text="Se Connecter" loading={loading} disabled={disabled} onPress={onPress} testID="Button" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ToConnect
