import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ICard } from './card.entity';

@Schema()
export class SCard implements ICard {
  @Prop()
  number: string;

  @Prop()
  type: string;

  @Prop()
  color: string;
}

export type CardDocument = HydratedDocument<SCard>;

export const CardSchema = SchemaFactory.createForClass(SCard);
