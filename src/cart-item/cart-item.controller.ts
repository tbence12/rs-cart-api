import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  HttpStatus,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CartItemService } from './services';

@Controller('api/profile/:cartId/cart-item')
export class CartItemController {
  constructor(
    private CartItemService: CartItemService,
  ) {}

  @Get()
  async getCartItemsByCartId(@Req() req) {
    console.log('getCartItemsByCartId - REQ:', req);
    const cartItems = await this.CartItemService.getCartItemsByCartId(req.params.cartId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cartItems },
    };
  }
  
  @Put()
  async addItemToCart(@Req() req, @Body() body) {
    console.log('addItemToCart, params:', req.params);
    const requestBody = JSON.parse(body.toString());
    const newCartItem = await this.CartItemService.addItemToCart(req.params.cartId, requestBody);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cartItem: newCartItem },
    };
  }
  
  @Delete()
  async removeCartItemById(@Req() req, @Body() body) {
    console.log('removeCartItemById, params:', req.params);
    const requestBody = JSON.parse(body.toString());
    const deletedCartItem = await this.CartItemService.removeCartIemById(req.params.cartId, requestBody);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cartItem: deletedCartItem },
    };
  }
}
