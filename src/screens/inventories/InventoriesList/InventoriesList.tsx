import React from 'react'
import { ScreenContainer, StatusTabs, InventoryCard, CreateInventoryButton } from '../../../components'
import { SafeAreaView, FlatList } from 'react-native'
import inventoriesListStyles from './InventoriesList.styles'
import { Inventory } from '../../../@types'

const InventoriesList = (): JSX.Element => {
    const inventories: Inventory[] = [
        {
            id: 1,
            date: '12/12/2021',
            reason: 'Inventaire annuel',
            status: 'fermé',
            products: [1, 2]
        },
        {
            id: 2,
            date: '12/12/2021',
            reason: 'Inventaire annuel',
            status: 'ouvert',
            products: [1, 2]
        },
        {
            id: 3,
            date: '12/12/2021',
            reason: 'Inventaire annuel',
            status: 'fermé',
            products: [1, 2]
        },
        {
            id: 4,
            date: '12/12/2021',
            reason: 'Inventaire annuel',
            status: 'ouvert',
            products: [1, 2]
        }
    ]

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
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={inventoriesListStyles.inventoriesContainer}
            />

            <CreateInventoryButton />
        </SafeAreaView>
    )
}

export default InventoriesList
