import { getDocs, collection } from 'firebase/firestore'
import { db } from '../configs/firebase'
import { Product } from '../@types'
import realm from '../configs/realm'

// Create a new product
const createUnknownProducts = (product: Product) => {
    realm.write(() => {
        realm.create<Product>('Product', {
            id: product.id,
            name: product.name,
            codeBar: product.codeBar,
            status: product.status
        })
    })
}

// get all products
const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'))
        const products: Product[] = []
        querySnapshot.forEach(doc => {
            products.push(doc.data() as Product)
        })
        return products
    } catch (e) {
        console.error(e)
    }
}

export { createUnknownProducts, getProducts }
