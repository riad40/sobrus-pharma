type Product = {
    id: number
    name: string
    codeBar: string
    status: string
}

type InventoryProducts = {
    name: string
    codeBar: string
    quantity: number
    status: string
}

type Inventory = {
    id: number
    products: InventoryProducts[]
    reason: string
    status: string
    date: string
}

export type { Product, Inventory, InventoryProducts }
