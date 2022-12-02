import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/:id')
  getUser(@Param('id') id) {
    return this.appService.getUser(+id);
  }

  @Get('user')
  getUsers() {
    return this.appService.getUsers();
  }

  @Delete('user/d/:id')
  deleteUser(@Param('id') id) {
    this.appService.deleteUser(+id);
  }
}
