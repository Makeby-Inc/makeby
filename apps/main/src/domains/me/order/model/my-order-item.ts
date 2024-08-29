import { type MyOrder } from '#/me/order/model/my-order-include'

export type MyOrderItem = MyOrder['orderItems'][0]
