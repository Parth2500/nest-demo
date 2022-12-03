export interface IUser {
  name: string;
  cardNumber: string;
  cardType: string;
}

export class User implements IUser {
  name: string;
  cardNumber: string;
  cardType: string;
}
