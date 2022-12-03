import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from './user.entity';

@Schema()
export class SUser implements IUser {
  @Prop()
  name: string;

  @Prop()
  cardNumber: string;

  @Prop()
  cardType: string;
}

export type UserDocument = HydratedDocument<SUser>;

export const UserSchema = SchemaFactory.createForClass(SUser);
