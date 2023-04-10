export type User = {
  id: string,
  username: string,
}

export type CartItem = {
  productId: string,
  count: number,
}

export enum CartStatus {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

export type Cart = {
  id: string,
  items: CartItem[],
  status: CartStatus,
}

export type Order = {
  id?: string,
  userId: string;
  cartId: string;
  payment: {
    type: string,
  },
  delivery: {
    code: string
  },
  comments: string,
  status: string;
  total: number;
}
