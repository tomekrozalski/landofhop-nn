import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Code, Language } from 'language/utils/types';

@Injectable()
export class GetCodesService {
  constructor(
    @InjectModel('Language') private readonly languageModel: Model<Language>,
  ) {}

  async getCodes() {
    const response: Code[] = await this.languageModel.getCodes();

    return response;
  }
}
