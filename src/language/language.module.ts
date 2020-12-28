import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import LanguageSchema from 'language/utils/language.schema';
import {
  GetAllLanguagesController,
  GetAllLanguagesService,
} from './getAllLanguages';
import { GetCodesController, GetCodesService } from './getCodes';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Language', schema: LanguageSchema }]),
  ],
  controllers: [GetAllLanguagesController, GetCodesController],
  providers: [GetAllLanguagesService, GetCodesService],
})
export class LanguageModule {}
