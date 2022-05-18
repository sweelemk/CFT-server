import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './entities';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService],
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
})
export class CurrencyModule {}
