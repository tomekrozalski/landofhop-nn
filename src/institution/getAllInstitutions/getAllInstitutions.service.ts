import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Institution } from 'institution/utils/types';

@Injectable()
export class GetAllInstitutionsService {
  constructor(
    @InjectModel('Institution')
    private readonly institutionModel: Model<Institution>,
  ) {}

  async getAllInstitutions() {
    const response: Institution[] = await this.institutionModel.getAllInstitutions();

    return response;
  }
}
