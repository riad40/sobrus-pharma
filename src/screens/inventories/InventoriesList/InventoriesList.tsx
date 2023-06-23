import React from 'react'
import {
    ScreenContainer,
    StatusTabs,
    InventoryCard,
    CreateInventoryButton,
    CreateInventoryModal
} from '../../../components'
import { SafeAreaView, FlatList } from 'react-native'
import inventoriesListStyles from './InventoriesList.styles'
import { Inventory } from '../../../@types'
import { useAppSelector, RootState } from '../../../state/store'

const InventoriesList = (): JSX.Element => {
    const { inventories }: { inventories: Array<Inventory> } = useAppSelector((state: RootState) => state.inventories)

    const [modalVisible, setModalVisible] = React.useState(false)

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScreenContainer title="Inventaires" icon={true}>
                <StatusTabs />
            </ScreenContainer>

            <FlatList
                data={inventories}
                renderItem={({ item }) => (
                    <InventoryCard
                        inventory={item}
                        onPress={() => {
                            console.log('hello')
                        }}
                    />
                )}
                keyExtractor={(item: Inventory) => item.id.toString()}
                contentContainerStyle={inventoriesListStyles.inventoriesContainer}
            />

            <CreateInventoryButton onPress={toggleModal} />

            <CreateInventoryModal visible={modalVisible} onClose={toggleModal} />
        </SafeAreaView>
    )
}

export default InventoriesList
