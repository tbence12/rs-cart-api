import {
  Controller,
  Get,
  Body,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { OrderService } from './services';

@Controller('api/profile/orders')
export class OrderController {
  constructor(
    private OrderService: OrderService,
  ) {}

  @Get()
  async getAllOrder() {
    console.log('getAllOrder called;');
    const orders = await this.OrderService.getOrders();

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { orders: orders },
    }
  }
  
  @Post()
  async addOrder(@Body() body) {
    console.log('addOrder');
    const requestBody = JSON.parse(body.toString());
    const newOrder = await this.OrderService.create(requestBody);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order: newOrder },
    };
  }

  @Get(':orderId')
  async getOrderById(@Param('orderId') orderId: string) {
    console.log('getOrderById - orderId:', orderId);
    const order = await this.OrderService.findById(orderId);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order },
    };
  }
  
  
  @Put(':orderId')
  async removeOrder(@Param('orderId') id: string, @Body() body) {
    console.log('removeOrder - id:', id);
    const requestBody = JSON.parse(body.toString());
    const updatedOrder = await this.OrderService.update(id, requestBody);

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { order: updatedOrder },
    };
  }
}
