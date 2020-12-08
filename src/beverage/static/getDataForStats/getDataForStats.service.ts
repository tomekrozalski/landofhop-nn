import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Details } from 'beverage/utils/types';
import { Stats } from 'beverage/utils/types';
import { Language } from 'language/utils/types';
import { Code } from 'language/utils/types';
import { RawData } from './RawData';
import normalize from './normalize';

@Injectable()
export class GetDataForStatsService {
  constructor(
    @InjectModel('Language') private readonly getCodesModel: Model<Language>,
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getDataForStats({ language }): Promise<Stats> {
    const rawBeverages: RawData[] = await this.beverageModel.getDataForStats();
    const languageList: Code[] = await this.getCodesModel.getCodes();

    const data: Stats = normalize({
      language,
      languageList,
      values: rawBeverages,
    });

    return data;
  }
}
