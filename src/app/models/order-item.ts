import { CatalogItem } from "./catalog-item";

export interface OrderItem {
    catalogItem: CatalogItem,
    quantity: number
}