import { Injectable } from '@nestjs/common';
import { IUser } from './Models/user.interface';

@Injectable()
export class AppService {
  users: IUser[] = [
    { id: 0, name: 'duhvi', cardNumber: 'afqfe', cardType: 'fvave' },
    { id: 1, name: 'dsjb', cardNumber: 'afdfae', cardType: 'avrea' },
    { id: 2, name: 'ddfs', cardNumber: 'aefqfew', cardType: 'arevea' },
    { id: 3, name: 'dfadf', cardNumber: 'twgr', cardType: 'uevarevrevhie' },
    { id: 4, name: 'gshf', cardNumber: 'rear', cardType: 'reavas' },
    { id: 5, name: 'fdfad', cardNumber: 'egrw', cardType: 'uevraerrhie' },
    { id: 6, name: 'duhgfavi', cardNumber: 'idrwaerfeb', cardType: 'arege' },
  ];

  getUser(id: number) {
    return this.users.find((x) => x.id == id);
  }

  getUsers() {
    return { users: this.users };
  }

  addUser(user: IUser) {
    this.users = [...this.users, user];
  }

  deleteUser(id: number) {
    this.users = this.users.filter((x) => x.id != id);
  }
}
