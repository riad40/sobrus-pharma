import React from 'react'
import { ScreenContainer, StatusTabs, InventoryCard } from '../../../components'
import { SafeAreaView, View } from 'react-native'
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
        <SafeAreaView>
            <ScreenContainer title="Inventaires" icon={false}>
                <StatusTabs />
                <View style={inventoriesListStyles.inventoriesContainer}>
                    {inventories.map(inventory => (
                        <InventoryCard
                            key={inventory.id}
                            inventories={inventory}
                            onPress={() => console.log('pressed')}
                        />
                    ))}
                </View>
            </ScreenContainer>
        </SafeAreaView>
    )
}

export default InventoriesList
