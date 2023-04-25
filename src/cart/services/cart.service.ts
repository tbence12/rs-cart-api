import { Injectable } from '@nestjs/common';
import { poolQuery } from 'src/database/db';
import { Cart, CartItem, CartStatus } from 'src/models';

const SELECT_ALL_FROM_CART = 'SELECT * FROM cart';
const SELECT_ALL_FROM_CART_BY_USER_ID = 'SELECT * FROM cart WHERE user_id=$1';
const SELECT_ALL_FROM_CART_ITEM_BY_CART_ID = 'SELECT * FROM cart_item WHERE cart_id=$1';
const SELECT_ALL_FROM_CART_ITEM_BY_CART_ID_AND_PRODUCT_ID = 'SELECT * FROM cart_item WHERE cart_id=$1 AND product_id=$2';
const INSERT_INTO_CART = 'INSERT INTO cart (user_id, status) VALUES ($1, $2) RETURNING *';
const UPDATE_CART_ITEM = 'UPDATE cart_item SET "count"=$3 WHERE cart_id=$1 AND product_id=$2';
const DELETE_FROM_CART_BY_USER_ID = 'DELETE FROM cart WHERE user_id=$1 RETURNING *';

@Injectable()
export class CartService {
  async findAll() {
    try {
      const carts = await poolQuery(SELECT_ALL_FROM_CART, []);

      return carts.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async findByUserId(userId: string): Promise<Cart> {
    try {
      const values = [userId];
      const cartByUserID = await poolQuery(SELECT_ALL_FROM_CART_BY_USER_ID, values);
      const cartId = cartByUserID.rows?.[0].id;
      const status = cartByUserID.rows?.[0].status;

      const cartItems = await poolQuery(SELECT_ALL_FROM_CART_ITEM_BY_CART_ID, [cartId]);
      const cart = {
        id: cartId,
        items: cartItems.rows.map(cartItem => ({
          productId: cartItem.product_id,
          count: cartItem.count,
        })),
        status
      };

      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  async createByUserId(userId: string) {
    try {
      const status = CartStatus.OPEN;
      const values = [userId, status];
      const newCart = await poolQuery(INSERT_INTO_CART, values);
      const userCart = {
        id: newCart.rows[0].id,
        items: [],
        status
      };

      return userCart;
    } catch (error) {
      console.error(error);
    }
  }
  
  async findOrCreateByUserId(userId: string): Promise<Cart> {
    try {
      const userCart = await this.findByUserId(userId);

      if (userCart) {
        return userCart;
      }

      const newCart = await this.createByUserId(userId);

      return newCart;
    } catch (error) {
      console.error(error);
    }
  }

  async updateByUserId(userId: string, { productId, count }: CartItem): Promise<Cart> {
    try {
      const { id: cartId, ...rest }: any = await this.findOrCreateByUserId(userId);
    
      const cartItems = await poolQuery(SELECT_ALL_FROM_CART_ITEM_BY_CART_ID_AND_PRODUCT_ID, [cartId, productId]);
    
      if (count > cartItems.rows?.[0]?.count || !cartItems.rows?.[0]) {
        if (cartItems.rows[0]) {
          await poolQuery(UPDATE_CART_ITEM, [cartId, productId, count]);
        }
      }
      const updatedCartItems = await poolQuery(SELECT_ALL_FROM_CART_ITEM_BY_CART_ID, [cartId]);
    
      const updatedCart = {
        cartId,
        ...rest,
        items: updatedCartItems.rows.map(cartItem => ({
          productId: cartItem.product_id,
          count: cartItem.count,
        })),
      };

      return updatedCart;
    } catch (error) {
      console.error(error);
    }
  }

  async removeByUserId(userId): Promise<void> {
    try {
      const deletedCart = await poolQuery(DELETE_FROM_CART_BY_USER_ID, [userId]);
  
      return deletedCart.rows;
    } catch (error) {
      console.error(error);
    }
  }
}
