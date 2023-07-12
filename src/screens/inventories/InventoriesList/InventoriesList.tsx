import React, { useState } from 'react'
import { SafeAreaView, FlatList } from 'react-native'

import inventoriesListStyles from './InventoriesList.styles'
import {
    ScreenContainer,
    StatusTabs,
    InventoryCard,
    CreateInventoryButton,
    CreateInventoryModal
} from '../../../components'

import { Inventory } from '../../../@types'
import { useAppSelector, RootState } from '../../../state/store'

import { useNavigation, NavigationProp } from '@react-navigation/native'
import InventoryStackParamsList from '../../../navigations/stacks/InventoryStack/InventoryStackParamsList'

const InventoriesList = (): JSX.Element => {
    const { inventories } = useAppSelector((state: RootState) => state.inventories)

    const [modalVisible, setModalVisible] = useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const navigation = useNavigation<NavigationProp<InventoryStackParamsList>>()

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenContainer title="Inventaires" icon={false}>
                <StatusTabs />
            </ScreenContainer>

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
