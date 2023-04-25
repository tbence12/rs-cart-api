import {
  Controller,
  Get,
  Delete,
  Body,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UsersService } from './services';

@Controller('api/profile/users')
export class UsersController {
  constructor(
    private UsersService: UsersService,
  ) {}

  @Get()
  async getAllUser() {
    console.log('getAllUsers called;');
    const users = await this.UsersService.getUsers();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { users: users },
    }
  }
  
  @Post()
  async addUser(@Body() body) {
    console.log('addUser');
    const requestBody = JSON.parse(body.toString());
    console.log('requestBody:', requestBody);
    const newUser = await this.UsersService.createOne(requestBody);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { user: newUser },
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    console.log('getUserById - id:', id);
    const user = await this.UsersService.findOne(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { user },
    };
  }
  
  
  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    console.log('removeUser - id:', id);
    const deletedUser = await this.UsersService.removeUser(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { user: deletedUser },
    };
  }
}
