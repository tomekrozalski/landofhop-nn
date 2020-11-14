import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Details } from 'beverage/utils/types';

@Injectable()
export class GetTotalService {
  constructor(
    @InjectModel('Beverage') private readonly beverageModel: Model<Details>,
  ) {}

  async getTotal(): Promise<number> {
    const total: number = await this.beverageModel.count().exec();

    return total;
  }
}
