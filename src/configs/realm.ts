import Realm, { ObjectSchema } from 'realm'
import { Inventory, Product } from '../@types'

const ProductSchema: ObjectSchema = {
    name: 'Product',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        codeBar: 'string',
        status: 'string'
    }
}

const InventoryProductSchema: ObjectSchema = {
    name: 'InventoryProduct',
    properties: {
        name: 'string',
        quantity: 'int',
        codeBar: 'string',
        status: 'string'
    }
}

const InventorySchema: ObjectSchema = {
    name: 'Inventory',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', indexed: true },
        reason: 'string',
        status: 'string',
        date: 'string',
        products: {
            type: 'list',
            objectType: 'InventoryProduct'
        }
    }
}

const getNextInventoryId = (realm: Realm): number => {
    const lastInventory = realm.objects<Inventory>('Inventory').sorted('id', true)[0]
    return lastInventory ? lastInventory.id + 1 : 1
}

const getNextProductId = (realm: Realm): number => {
    const lastProduct = realm.objects<Product>('Product').sorted('id', true)[0]
    return lastProduct ? lastProduct.id + 1 : 1
}

const realm = new Realm({
    schema: [ProductSchema, InventorySchema, InventoryProductSchema]
})

export { getNextInventoryId, getNextProductId }

export default realm
