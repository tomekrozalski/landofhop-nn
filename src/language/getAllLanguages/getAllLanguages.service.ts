import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Language } from 'language/utils/types';

@Injectable()
export class GetAllLanguagesService {
  constructor(
    @InjectModel('Language') private readonly languageModel: Model<Language>,
  ) {}

  async getAllLanguages() {
    const response: Language[] = await this.languageModel.getAllLanguages();

    return response;
  }
}
