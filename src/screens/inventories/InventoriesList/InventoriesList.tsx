import React from 'react'
import { ScreenContainer, StatusTabs, InventoryCard, CreateInventoryButton } from '../../../components'
import { SafeAreaView, FlatList } from 'react-native'
import inventoriesListStyles from './InventoriesList.styles'
import { Inventory } from '../../../@types'
import { useAppSelector, RootState } from '../../../state/store'

const InventoriesList = (): JSX.Element => {
    const { inventories }: { inventories: Array<Inventory> } = useAppSelector((state: RootState) => state.inventories)

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

            <CreateInventoryButton />
        </SafeAreaView>
    )
}

export default InventoriesList
