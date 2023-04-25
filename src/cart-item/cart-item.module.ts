import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './services';


@Module({
  imports: [ OrderModule ],
  providers: [ CartItemService ],
  controllers: [ CartItemController ]
})
export class CartItemModule {}
