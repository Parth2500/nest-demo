import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = await new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    const Users = await this.userModel.find();
    if (!Users || Users.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return Users;
  }

  async findOne(id: string): Promise<IUser> {
    const User = await this.userModel.findById(id).exec();
    if (!User) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return User;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const User = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!User) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return User;
  }

  async remove(id: string): Promise<IUser> {
    const User = await this.userModel.findByIdAndDelete(id);
    if (!User) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return User;
  }
}
