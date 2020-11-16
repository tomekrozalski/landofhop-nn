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

  async getDetails(id): Promise<AugmentedDetails> {
    const rawBeverages: RawData[] = await this.beverageModel.getDetails(id);
    const formattedDetails: Details = detailsNormalizer({
      beverage: rawBeverages[0],
      transformLanguageIds: true,
    });

    const rawBasics: RawBasicsData[] = await this.beverageModel.getBasics({});
    const basics: Basics[] = rawBasics.map(normalizeBasics);
    const selectedBasics: Basics = basics.find(
      props => Types.ObjectId(props.id).toString() === id,
    );
    const index = basics.indexOf(selectedBasics);

    return {
      previous: index ? basics[index - 1] : null,
      details: formattedDetails,
      next: index !== basics.length - 1 ? basics[index + 1] : null,
    };
  }
}
