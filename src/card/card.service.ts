import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ICard } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private cardModel: Model<ICard>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<ICard> {
    const newCard = await new this.cardModel(createCardDto);
    return newCard.save();
  }

  async findAll(): Promise<ICard[]> {
    const cacheData = await this.cacheService.get<ICard[]>('Cards');
    if (cacheData) {
      return cacheData;
    }
    const Cards = await this.cardModel.find();
    if (!Cards || Cards.length == 0) {
      throw new NotFoundException('Card data not found!');
    }
    await this.cacheService.set('Cards', Cards, 15);
    return Cards;
  }

  async findOne(id: string): Promise<ICard> {
    const cacheData = await this.cacheService.get<ICard>(id.toString());
    if (cacheData) {
      return cacheData;
    }
    const Card = await this.cardModel.findById(id).exec();
    if (!Card) {
      throw new NotFoundException(`Card #${id} not found`);
    }
    await this.cacheService.set(id.toString(), Card, 15);
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
