import { OrderLine } from "./order-line";

export interface Order {
    orderId: string,
    customerId: string,
    orderLines: OrderLine[],
    orderStatus: string
}