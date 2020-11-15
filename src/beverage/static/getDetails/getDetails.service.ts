import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Details, RawData } from 'beverage/utils/types';
import normalize from './normalize';

@Injectable()
export class GetDetailsService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getDetails(id): Promise<Details> {
    const rawBeverages: RawData[] = await this.beverageModel.getDetails(id);
    const formattedDetails: Details = normalize(rawBeverages[0]);

    return formattedDetails;
  }
}
