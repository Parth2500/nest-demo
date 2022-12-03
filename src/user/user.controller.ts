import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const User = await this.userService.create(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User created successfully!',
        User,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User Not Created!',
        error: 'Bad Request!',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const Users = await this.userService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Users found successfully!',
        Users,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const User = await this.userService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully!',
        User,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const User = await this.userService.update(id, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User updated successfully!',
        User,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const User = await this.userService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully!',
        User,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
