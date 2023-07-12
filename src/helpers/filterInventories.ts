import { Inventory } from '../@types'

const filterInventories = (inventories: Inventory[], filter: string) => {
    return inventories.filter(inventory => inventory.status === filter)
}

export default filterInventories
