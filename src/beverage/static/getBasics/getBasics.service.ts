import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Basics, Details } from 'beverage/utils/types';
// import normalize from './normalize';

@Injectable()
export class GetBasicsService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getBasics(): Promise<Basics[]> {
    const rawBeverages: Details[] = await this.beverageModel.getBasics();

    // const formattedBeverages: Basics[] = rawBeverages.map(beverage =>
    //   normalize(beverage),
    // );

    return rawBeverages;
  }
}
