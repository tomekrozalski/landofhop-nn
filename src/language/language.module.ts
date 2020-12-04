import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import LanguageSchema from 'language/language.schema';
import { GetCodesController, GetCodesService } from './getCodes';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Language', schema: LanguageSchema }]),
  ],
  controllers: [GetCodesController],
  providers: [GetCodesService],
})
export class LanguageModule {}
