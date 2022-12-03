import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Card } from './entities/card.entity';
import { CardSchema } from './entities/card.schema';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
})
export class CardModule {}
