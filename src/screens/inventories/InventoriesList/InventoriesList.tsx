import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, View, Text, Image } from 'react-native'

import inventoriesListStyles from './InventoriesList.styles'
import { StatusTabs, InventoryCard, CreateInventoryButton, CreateInventoryModal, Header } from '../../../components'

import { Inventory } from '../../../@types'
import { useAppSelector, RootState } from '../../../state/store'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import InventoryStackParamsList from '../../../navigations/stacks/InventoryStack/InventoryStackParamsList'

import realm from '../../../configs/realm'

const InventoriesList = (): JSX.Element => {
    const { inventories } = useAppSelector((state: RootState) => state.inventories)

    const [modalVisible, setModalVisible] = useState(false)

    const [isNewInventoryAdded, setIsNewInventoryAdded] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const navigation = useNavigation<NavigationProp<InventoryStackParamsList>>()

    useEffect(() => {
        navigation.addListener('focus', () => {
            const inventories = realm.objects<Inventory>('Inventory')

            inventories.addListener((inventories, changes) => {
                changes.insertions.forEach(() => {
                    setIsNewInventoryAdded(true)
                })
            })

            const timeout = setTimeout(() => {
                setIsNewInventoryAdded(false)
            }, 2000)

            return () => {
                clearTimeout(timeout)
            }
        })
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Inventaires" icon={false} />
            <StatusTabs />

            {isNewInventoryAdded && (
                <View style={inventoriesListStyles.newInventoryAddedContainer2}>
                    <View style={inventoriesListStyles.newInventoryAddedContainer}>
                        <Image source={require('../../../assets/images/check.png')} />
                        <Text style={inventoriesListStyles.newInventoryAddedText}>
                            Votre inventaire a été créée avec succès
                        </Text>
                    </View>
                </View>
            )}

            <FlatList
                data={inventories}
                renderItem={({ item }) => (
                    <InventoryCard
                        inventory={item}
                        onPress={() => {
                            navigation.navigate('InventoryDetails', { inventoryId: item.id })
                        }}
                    />
                )}
                keyExtractor={(item: Inventory) => item.id?.toString()}
                contentContainerStyle={inventoriesListStyles.inventoriesContainer}
            />

            <CreateInventoryButton onPress={toggleModal} />

            <CreateInventoryModal visible={modalVisible} onClose={toggleModal} />
        </SafeAreaView>
    )
}

export default InventoriesList
