import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Basics } from 'beverage/utils/types';
import { RawData } from './rawData.type';
import normalize from './normalize';

@Injectable()
export class GetBasicsService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Basics>,
  ) {}

  async getBasics({ language, limit, skip }): Promise<Basics[]> {
    const rawBeverages: RawData[] = await this.beverageModel.getBasics({
      limit,
      skip,
    });

    const formattedBeverages: Basics[] = rawBeverages.map(beverage =>
      normalize({ beverage, language }),
    );

    return formattedBeverages;
  }
}
