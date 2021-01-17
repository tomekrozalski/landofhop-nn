import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Language } from 'language/utils/types';

@Injectable()
export class AddNewLanguageService {
  constructor(
    @InjectModel('Language')
    private readonly languageModel: Model<Language>,
  ) {}

  async addNewLanguage({ code, name }) {
    const newLanguage = new this.languageModel({
      code,
      name: name.map(({ language, value }) => ({
        ...(language !== 'none' && { language }),
        value,
      })),
    });

    await newLanguage.save();

    const updatedLanguages = await this.languageModel.getAllLanguages();
    return updatedLanguages;
  }
}
