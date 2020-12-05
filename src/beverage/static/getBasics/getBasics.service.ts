import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Language } from 'language/utils/types';
import { Code } from 'language/utils/types';
import { Basics } from 'beverage/utils/types';
import { RawData } from './RawData';
import normalize from './normalize';

@Injectable()
export class GetBasicsService {
  constructor(
    @InjectModel('Language') private readonly getCodesModel: Model<Language>,
    @InjectModel('Beverage') private readonly beverageModel: Model<Basics>,
  ) {}

  async getBasics({ language, limit, skip }): Promise<Basics[]> {
    const rawBeverages: RawData[] = await this.beverageModel.getBasics({
      limit,
      skip,
    });
    const languageList: Code[] = await this.getCodesModel.getCodes();

    const formattedBeverages: Basics[] = rawBeverages.map(beverage =>
      normalize({ beverage, language, languageList }),
    );

    return formattedBeverages;
  }
}
