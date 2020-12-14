import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Details } from 'beverage/utils/types';
import { RawData } from 'beverage/admin/getAdminDetails/RawData';

@Injectable()
export class GetAdminDetailsService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getAdminDetails({ id }): Promise<RawData> {
    const details: RawData = await this.beverageModel.getAdminDetails({ id });

    return details;
  }
}
