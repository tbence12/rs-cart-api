import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CartModule,
    OrderModule,
    CartItemModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
