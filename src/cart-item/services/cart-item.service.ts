import { Injectable } from '@nestjs/common';
import { CartItem } from '../../models';
import { poolQuery } from '../../database/db';

const SELECT_FROM_CART_ITEM = 'SELECT * FROM cart_item WHERE cart_id=$1';
const INSERT_INTO_CART_ITEM = 'INSERT INTO cart_item (cart_id, product_id, "count") VALUES ($1, $2, $3) RETURNING *';
const DELETE_FROM_CART_ITEM = 'DELETE FROM cart_item WHERE cart_id=$1 AND product_id=$2 RETURNING *';

@Injectable()
export class CartItemService {
  async getCartItemsByCartId(cartId: string): Promise<CartItem[]> {
    try {
      const values = [cartId];
      const cartItemsByUserID = await poolQuery(SELECT_FROM_CART_ITEM, values);
      
      return cartItemsByUserID.rows
    } catch (error) {
      console.error(error);
    }
  }

  async addItemToCart(cartId: string, item: CartItem) {
    try {
      const values = [cartId, item.productId, item.count];
      const newCartItem = await poolQuery(INSERT_INTO_CART_ITEM, values);
  
      return newCartItem.rows;
    }  catch (error) {
      console.error(error);
    }
  }

  async removeCartIemById(cartId: string, item: CartItem) {
    try {
      const values = [cartId, item.productId];
      const deletedCartItem = await poolQuery(DELETE_FROM_CART_ITEM, values);
  
      return deletedCartItem.rows;
    }  catch (error) {
      console.error(error);
    }
  }
}
