import { Controller, Get, Delete, Put, Body, HttpStatus, Param } from '@nestjs/common';
import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
  ) { }

  @Get()
  async getAllCarts() {
    console.log('getAllCarts called;');
    const carts = await this.cartService.findAll();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { carts: carts },
    }
  }
  
  @Get(':userId')
  async findUserCart(@Param('userId') userId: string) {
    console.log('findUserCart called;');
    const cart = await this.cartService.findOrCreateByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart },
    }
  }

  @Put(':userId')
  async updateUserCart(@Param('userId') userId: string, @Body() body) {
    console.log('updateUserCart called;');
    const requestBody = JSON.parse(body.toString());
    const updatedCart = await this.cartService.updateByUserId(userId, requestBody);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart: updatedCart },
    }
  }

  @Delete(':userId')
  async clearUserCart(@Param('userId') userId: string) {
    console.log('clearUserCart called;');
    const deletedCart = await this.cartService.removeByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart: deletedCart },
    }
  }
}
