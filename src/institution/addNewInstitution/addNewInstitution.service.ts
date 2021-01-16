import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Institution } from 'institution/utils/types';

@Injectable()
export class AddNewInstitutionService {
  constructor(
    @InjectModel('Institution')
    private readonly institutionModel: Model<Institution>,
  ) {}

  async addNewInstitution({ badge, name, ownedBy, shortId, website }) {
    const newInstitution = new this.institutionModel({
      badge,
      name: name.map(({ language, value }) => ({
        ...(language !== 'none' && { language }),
        value,
      })),
      ...(ownedBy && { consortium: ownedBy }),
      shortId,
      ...(website && { website }),
    });

    await newInstitution.save();

    const updatedInstitutions = await this.institutionModel.getAllInstitutions();
    return updatedInstitutions;
  }
}
