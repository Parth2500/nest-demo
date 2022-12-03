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
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
  CacheKey,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async create(@Res() response, @Body() createCardDto: CreateCardDto) {
    try {
      const Card = await this.cardService.create(createCardDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Card created successfully!',
        Card,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Card Not Created!',
        error: 'Bad Request!',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const Cards = await this.cardService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'Cards found successfully!',
        Cards,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const Card = await this.cardService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Card found successfully!',
        Card,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    try {
      const Card = await this.cardService.update(id, updateCardDto);
      return response.status(HttpStatus.OK).json({
        message: 'Card updated successfully!',
        Card,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string) {
    try {
      const Card = await this.cardService.remove(id);
      return response.status(HttpStatus.OK).json({
        message: 'Card deleted successfully!',
        Card,
      });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
