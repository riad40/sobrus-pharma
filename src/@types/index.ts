type Product = {
    id: number
    name: string
    dci: string
    classTherapeutic: string
    laboratory: string
    avatar: string
    barcode: string
}

type Inventory = {
    id: number
    products: { codeBar?: string; productName?: string; quantity?: number }[]
    reason: string
    status: string
    date: string
}

export type { Product, Inventory }
