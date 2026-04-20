import type { Set } from './mtg'

export interface Category {
    id: string,
    label: string,
    expanded: boolean,
    sets: Set[]
}