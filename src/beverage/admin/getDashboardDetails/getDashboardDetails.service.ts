import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Language } from 'language/utils/types';
import { Code } from 'language/utils/types';
import { AugmentedDetails, Details, RawData } from 'beverage/utils/types';
// import { RawData as RawBasicsData } from 'beverage/static/getBasics/RawData';
// import normalizeBasics from 'beverage/static/getBasics/normalize';
import normalize from './normalize';

@Injectable()
export class GetDashboardDetailsService {
  constructor(
    @InjectModel('Language') private readonly getCodesModel: Model<Language>,
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getDashboardDetails(id): Promise<any> {
    const rawBeverages: RawData[] = await this.beverageModel.getDashboardDetails(
      id,
    );

    const languageList: Code[] = await this.getCodesModel.getCodes();

    const formattedDetails: any = normalize(rawBeverages[0]);

    return formattedDetails;
  }
}
