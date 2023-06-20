import { doc, setDoc, getDocs, collection } from 'firebase/firestore'
import { db } from '../configs/firebase'
import { Product } from '../@types'

// Create a new product
const createProduct = async (product: Product) => {
    try {
        const docRef = doc(db, 'products', product.id.toString())
        const docSnap = await setDoc(docRef, product)
        console.log('Document written with ID: ', docSnap)
    } catch (e) {
        console.error(e)
    }
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

export { createProduct, getProducts }
