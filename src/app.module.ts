import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Aegon:1%403qWe-%2B-@demo.hhl7vte.mongodb.net/?retryWrites=true&w=majority',
    ),
    CacheModule.register({ isGlobal: true }),
    UserModule,
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
