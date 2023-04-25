import { Injectable } from '@nestjs/common';
import { User } from '../../models';
import { poolQuery } from '../../database/db';

const SELECT_ALL_FROM_USER = 'SELECT * FROM "user"';
const SELECT_FROM_USER = 'SELECT * FROM "user" WHERE id=$1';
const INSERT_INTO_USER = 'INSERT INTO "user" (username) VALUES ($1) RETURNING *';
const DELETE_FROM_USER = 'DELETE FROM "user" WHERE id=$1 RETURNING *';

@Injectable()
export class UsersService {
  async getUsers(): Promise<User[]> {
    try {
      const users = await poolQuery(SELECT_ALL_FROM_USER, []);

      return users.rows;
    } catch (error) {
      console.error(error);
    }
  }

  async createOne({ username }: User): Promise<User> {
    try {
      const values = [username];
      const newUser = await poolQuery(INSERT_INTO_USER, values);
  
      return newUser.rows;
    }  catch (error) {
      console.error(error);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const userById = await poolQuery(SELECT_FROM_USER, [id]);
      
      return userById.rows
    } catch (error) {
      console.error(error);
    }
  }

  async removeUser(id: string) {
    try {
      const deletedUser = await poolQuery(DELETE_FROM_USER, [id]);
  
      return deletedUser.rows;
    }  catch (error) {
      console.error(error);
    }
  }
}
