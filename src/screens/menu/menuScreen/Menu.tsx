import React, { useState } from 'react'
import { View, SafeAreaView, Linking } from 'react-native'

import menuStyles from './menu.styles'
import { ScreenContainer, MenuItem, ContactAlert, EmailModal, EmailSentAlert } from '../../../components'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import RootStackParamsList from '../../../navigations/RootStackParamsList'
import MenuStackParamsList from '../../../navigations/stacks/MenuStack/MenuStackParamsList'
import HomeStackParamsList from '../../../navigations/stacks/HomeStack/HomeStackParamsList'

import realm from '../../../configs/realm'

import api from '../../../configs/api'

const Menu = (): JSX.Element => {
    const navigation = useNavigation<NavigationProp<MenuStackParamsList & HomeStackParamsList & RootStackParamsList>>()

    const handleClearStack = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'ToConnect' }]
        })
        realm.write(() => {
            realm.deleteAll()
        })
    }

    const handleOpenLink = async (link: string) => {
        await Linking.openURL(link)
    }

    const [contactAlertVisible, setContactAlertVisible] = useState<boolean>(false)

    const [emailModalVisible, setEmailModalVisible] = useState<boolean>(false)

    const [emailSentAlertVisible, setEmailSentAlertVisible] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)

    const [message, setMessage] = useState<string>('')

    const sendEmail = async () => {
        setEmailModalVisible(true)

        setLoading(true)

        const mail = await api.post('/sendMail', {
            email: 'riadabdelaziz40@gmail.com',
            subject: 'Contact Sobrus',
            html: `<p>${message}</p>`,
            data: []
        })

        if (mail.status === 200) {
            setEmailModalVisible(false)
            setEmailSentAlertVisible(true)
            setMessage('')
            setLoading(false)
        }

        setLoading(false)
    }

    return (
        <SafeAreaView>
            <ScreenContainer title="Menu" icon={false}>
                <View style={menuStyles.container}>
                    <MenuItem title="Accueil" onPress={() => navigation.navigate('Home')} />
                    <MenuItem title="Produits" onPress={() => navigation.navigate('ProductsList')} />
                    <MenuItem title="Contacter Sobrus" onPress={() => setContactAlertVisible(true)} />
                    <MenuItem title="Mon profil" onPress={() => handleOpenLink('https://www.account.sobrus.com')} />
                    <MenuItem title="Se déconnecter" onPress={handleClearStack} logout />
                </View>
            </ScreenContainer>

            <ContactAlert
                visible={contactAlertVisible}
                onClose={() => setContactAlertVisible(false)}
                onMail={() => setEmailModalVisible(true)}
                onCall={() => handleOpenLink('tel:+212 5 30 500 500')}
            />

            <EmailModal
                visible={emailModalVisible}
                onClose={() => setEmailModalVisible(false)}
                onMessageChange={setMessage}
                onSave={sendEmail}
                onEmailChange={() => console.log('email')}
                onlyEmail={false}
                loading={loading}
            />

            <EmailSentAlert visible={emailSentAlertVisible} onClose={() => setEmailSentAlertVisible(false)} />
        </SafeAreaView>
    )
}
export default Menu
