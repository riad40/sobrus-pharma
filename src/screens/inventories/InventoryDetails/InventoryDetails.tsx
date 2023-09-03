import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'

import inventoryDetailsStyles from './inventoryDetails.styles'
import {
    ScreenContainer,
    DetailsCard,
    ProductStatusCard,
    Button,
    EmailModal,
    EmailSentAlert
} from '../../../components'

import { useToast } from 'react-native-toast-notifications'

import { Inventory } from '../../../@types'

import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native'
import InventoryStackParamsList from '../../../navigations/stacks/InventoryStack/InventoryStackParamsList'

import { updateInventoryStatus, getInventoryById } from '../../../controllers/InventoriesController'

import api from '../../../configs/api'

console.log('Inventory details screen bundled')

type InventoryDetailsRouteProp = RouteProp<{ InventoryDetails: { inventoryId: number } }, 'InventoryDetails'>

const InventoryDetails = ({ route }: { route: InventoryDetailsRouteProp }): JSX.Element => {
    const { inventoryId } = route.params

    const navigation = useNavigation<NavigationProp<InventoryStackParamsList>>()

    const [inventory, setInventory] = useState<Inventory>(getInventoryById(inventoryId))

    const [details, setDetails] = useState<{ label: string; value: string | number }[]>()

    const [EmailModalVisible, setEmailModalVisible] = useState<boolean>(false)

    const [EmailSentAlertVisible, setEmailSentAlertVisible] = useState<boolean>(false)

    const [email, setEmail] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)

    const [emailError, setEmailError] = useState<string>('')

    const toast = useToast()

    const closeInventory = () => {
        updateInventoryStatus(inventoryId, 'férmé')

        const inventory = getInventoryById(inventoryId)

        setInventory(inventory)
    }

    const products = inventory.products.map(product => {
        return {
            name: product.name,
            quantity: product.quantity,
            status: product.status === 'known' ? 'Connu' : 'Inconnu'
        }
    })

    const sendEmail = async () => {
        setEmailModalVisible(true)

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        if (!email.trim() || !emailRegex.test(email.trim())) {
            setEmailError('Veuillez entrer un email valide')
            return
        }

        setLoading(true)

        const mail = await api.post('/sendMail', {
            email,
            subject: `Inventaire N° ${inventory.id} du ${inventory.date}`,
            html: '<p>Bonjour,</p><p> Vous trouverez en pièce jointe le fichier comportant tous les produits inventoriés.</p>',
            data: products
        })

        if (mail.status === 200) {
            setEmailModalVisible(false)
            toast.show('Email envoyé avec succès', { type: 'normal', placement: 'center', duration: 3000 })
            setEmail('')
            setLoading(false)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (!inventory) return

        const details = [
            {
                label: 'ID Inventaire',
                value: inventory.id
            },
            {
                label: 'Date',
                value: inventory.date
            },
            {
                label: 'Raison',
                value: inventory.reason
            },
            {
                label: 'Statut',
                value: inventory.status
            },
            {
                label: 'Nombre de produits sondés',
                value: inventory.products.filter(product => product.status === 'known').length
            }
        ]

        setDetails(details)
    }, [inventory])

    return (
        <SafeAreaView>
            <ScreenContainer title="Détails de l'inventaire" icon>
                <View style={inventoryDetailsStyles.container}>
                    <Text style={inventoryDetailsStyles.heading}>Informations de l&apos;inventaire</Text>

                    <DetailsCard details={details || []} />

                    <ProductStatusCard
                        status="known"
                        onPress={() => {
                            navigation.navigate('KnownProducts', {
                                products: inventory.products.filter(product => product.status === 'known')
                            })
                        }}
                    />

                    <ProductStatusCard
                        status="unknown"
                        onPress={() => {
                            navigation.navigate('UnknownProducts', {
                                products: inventory.products.filter(product => product.status === 'unknown')
                            })
                        }}
                    />

                    <View style={inventoryDetailsStyles.separator} />

                    {inventory.status === 'ouvert' ? (
                        <>
                            <Button
                                text="Continuer l'inventaire"
                                onPress={() => {
                                    navigation.navigate('ScanningScreen', { id: inventoryId })
                                }}
                            />

                            <TouchableOpacity onPress={closeInventory} style={inventoryDetailsStyles.closeBtn}>
                                <Text style={inventoryDetailsStyles.closeBtnText}>Clôturer</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Button text="Recevoir par email" onPress={() => setEmailModalVisible(true)} />
                    )}

                    <EmailModal
                        visible={EmailModalVisible}
                        onClose={() => {
                            setEmailModalVisible(false)
                        }}
                        onEmailChange={(value: string) => {
                            setEmail(value)
                            setEmailError('')
                        }}
                        onSave={sendEmail}
                        loading={loading}
                        onMessageChange={(value: string) => {
                            console.log(value)
                        }}
                        onlyEmail
                        emailError={emailError}
                    />

                    <EmailSentAlert
                        visible={EmailSentAlertVisible}
                        onClose={() => {
                            setEmailSentAlertVisible(false)
                        }}
                    />
                </View>
            </ScreenContainer>
        </SafeAreaView>
    )
}
export default InventoryDetails
