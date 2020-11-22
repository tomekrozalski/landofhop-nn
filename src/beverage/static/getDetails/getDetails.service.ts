import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  AugmentedDetails,
  Basics,
  Details,
  RawData,
} from 'beverage/utils/types';
import { detailsNormalizer } from 'beverage/utils/helpers';
import { RawData as RawBasicsData } from 'beverage/static/getBasics/rawData.type';
import normalizeBasics from 'beverage/static/getBasics/normalize';

@Injectable()
export class GetDetailsService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getDetails(props): Promise<AugmentedDetails> {
    const rawBeverages: RawData[] = await this.beverageModel.getDetails(props);
    const formattedDetails: Details = detailsNormalizer({
      beverage: rawBeverages[0],
      transformLanguageIds: true,
    });

    const rawPreviousBasics: RawBasicsData[] = await this.beverageModel.getPreviousBasics(
      formattedDetails.id,
    );

    const rawNextBasics: RawBasicsData[] = await this.beverageModel.getNextBasics(
      formattedDetails.id,
    );

    return {
      previous: rawPreviousBasics.length
        ? normalizeBasics(rawPreviousBasics[0])
        : null,
      details: formattedDetails,
      next: rawNextBasics.length ? normalizeBasics(rawNextBasics[0]) : null,
    };
  }
}
