import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Language } from 'language/types';
import { Code } from 'language/getCodes/code';
import { AugmentedDetails, Details, RawData } from 'beverage/utils/types';
import { RawData as RawBasicsData } from 'beverage/static/getBasics/rawData.type';
import normalizeBasics from 'beverage/static/getBasics/normalize';
import normalize from './normalize';

@Injectable()
export class GetDetailsService {
  constructor(
    @InjectModel('Language') private readonly getCodesModel: Model<Language>,
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getDetails({
    language,
    shortId,
    brand,
    name,
  }): Promise<AugmentedDetails> {
    const rawBeverages: RawData[] = await this.beverageModel.getBeverage({
      shortId,
      brand,
      name,
    });

    const languageList: Code[] = await this.getCodesModel.getCodes();

    const formattedDetails: Details = normalize({
      beverage: rawBeverages[0],
      language,
      languageList,
    });

    const rawPreviousBasics: RawBasicsData[] = await this.beverageModel.getPreviousBasics(
      formattedDetails.added,
    );

    const rawNextBasics: RawBasicsData[] = await this.beverageModel.getNextBasics(
      formattedDetails.added,
    );

    return {
      previous: rawPreviousBasics.length
        ? normalizeBasics({
            beverage: rawPreviousBasics[0],
            language,
            languageList,
          })
        : null,
      details: formattedDetails,
      next: rawNextBasics.length
        ? normalizeBasics({
            beverage: rawNextBasics[0],
            language,
            languageList,
          })
        : null,
    };
  }
}
