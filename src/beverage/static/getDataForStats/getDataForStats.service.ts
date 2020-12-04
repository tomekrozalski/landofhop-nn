import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Details } from 'beverage/utils/types';
import { Language } from 'language/types';
import { Code } from 'language/getCodes/code';
import { RawData } from './rawData.d';
import normalize from './normalize';

@Injectable()
export class GetDataForStatsService {
  constructor(
    @InjectModel('Language') private readonly getCodesModel: Model<Language>,
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getDataForStats({ language }): Promise<RawData[]> {
    const rawBeverages: RawData[] = await this.beverageModel.getDataForStats();
    const languageList: Code[] = await this.getCodesModel.getCodes();

    const data: any = normalize({
      language,
      languageList,
      values: rawBeverages,
    });

    return data;
  }
}
