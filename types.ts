export interface Family {
    id: number
    label: string
}

export interface Article {
    id: number
    familyId: number
    quantity: number
    label: string
}