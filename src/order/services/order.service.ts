import { Injectable } from '@nestjs/common';
import { Order } from '../../models';
import { poolQuery } from '../../database/db';


const SELECT_ALL_FROM_ORDER = 'SELECT * FROM "order"';
const SELECT_FROM_ORDER = 'SELECT * FROM "order" WHERE id=$1';
const INSERT_INTO_ORDER = 'INSERT INTO "order" (user_id, cart_id, payment, delivery, "comments", status, total) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
const UPDATE_ORDER = 'UPDATE "order" SET user_id = $1, cart_id = $2, payment = $3, delivery = $4, "comments" = $5, status = $6, total = $7 WHERE id=$8 RETURNING *';


@Injectable()
export class OrderService {
  async getOrders(): Promise<Order[]> {
    try {
      const orders = await poolQuery(SELECT_ALL_FROM_ORDER, []);

      return orders.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const {userId, cartId, payment, delivery, comments, total} = order;
      const status = 'IN PROGRESS';
      const values = [userId, cartId, payment, delivery, comments, status, total];
      const newOrder = await poolQuery(INSERT_INTO_ORDER, values);
  
      return newOrder.rows;
    }  catch (error) {
      console.error(error);
    }
  }
  
  async findById(orderId: string): Promise<Order> {
    try {
      const order = await poolQuery(SELECT_FROM_ORDER, [orderId]);
      
      return order.rows
    } catch (error) {
      console.error(error);
    }
  }

  async update(orderId: string, order: Order): Promise<Order> {
    try {
      const {userId, cartId, payment, delivery, comments, status, total} = order;
      const values = [userId, cartId, payment, delivery, comments, status, total, orderId];
      const updatedOrder = await poolQuery(UPDATE_ORDER, values);
  
      return updatedOrder.rows;
    }  catch (error) {
      console.error(error);
    }
  }
}
