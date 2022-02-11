import { Product } from './product';

export interface CatalogItem {
    catalogItemId: string,
    productId: string,
    price: number,
    product: Product
}