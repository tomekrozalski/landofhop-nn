import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Language } from 'language/utils/types';
import { Code } from 'language/utils/types';
import { Basics } from 'beverage/utils/types';
import { RawData } from 'beverage/static/getBasics/RawData';
import normalizeBasics from 'beverage/static/getBasics/normalize';

@Injectable()
export class SearchBeverageService {
  constructor(
    @InjectModel('Language') private readonly getCodesModel: Model<Language>,
    @InjectModel('Beverage') private readonly beverageModel: Model<Basics>,
  ) {}

  async search({ language, phrase }): Promise<Basics[]> {
    const rawBeverages: RawData[] = await this.beverageModel.search({ phrase });
    const languageList: Code[] = await this.getCodesModel.getCodes();

    const formattedBeverages: Basics[] = rawBeverages.map(beverage =>
      normalizeBasics({ beverage, language, languageList }),
    );

    return formattedBeverages;
  }
}
