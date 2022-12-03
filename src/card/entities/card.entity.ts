export interface ICard {
  number: string;
  type: string;
  color: string;
}

export class Card implements ICard {
  number: string;
  type: string;
  color: string;
}
