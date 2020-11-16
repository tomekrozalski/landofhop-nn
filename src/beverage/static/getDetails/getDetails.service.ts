import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Details, RawData } from 'beverage/utils/types';
import { detailsNormalizer } from 'beverage/utils/helpers';

@Injectable()
export class GetDetailsService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getDetails(id): Promise<Details> {
    const rawBeverages: RawData[] = await this.beverageModel.getDetails(id);
    const formattedDetails: Details = detailsNormalizer({
      beverage: rawBeverages[0],
      transformLanguageIds: true,
    });

    return formattedDetails;
  }
}
