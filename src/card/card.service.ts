import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ICard } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(@InjectModel('Card') private cardModel: Model<ICard>) {}

  async create(createCardDto: CreateCardDto): Promise<ICard> {
    const newCard = await new this.cardModel(createCardDto);
    return newCard.save();
  }

  async findAll(): Promise<ICard[]> {
    const Cards = await this.cardModel.find();
    if (!Cards || Cards.length == 0) {
      throw new NotFoundException('Card data not found!');
    }
    return Cards;
  }

  async findOne(id: string): Promise<ICard> {
    const Card = await this.cardModel.findById(id).exec();
    if (!Card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return Card;
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<ICard> {
    const Card = await this.cardModel.findByIdAndUpdate(id, updateCardDto, {
      new: true,
    });
    if (!Card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return Card;
  }

  async remove(id: string): Promise<ICard> {
    const Card = await this.cardModel.findByIdAndDelete(id);
    if (!Card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    return Card;
  }
}
