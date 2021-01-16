import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import InstitutionSchema from 'institution/utils/institution.schema';
import {
  AddNewInstitutionController,
  AddNewInstitutionService,
} from './addNewInstitution';
import {
  GetAllInstitutionsController,
  GetAllInstitutionsService,
} from './getAllInstitutions';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Institution', schema: InstitutionSchema },
    ]),
  ],
  controllers: [AddNewInstitutionController, GetAllInstitutionsController],
  providers: [AddNewInstitutionService, GetAllInstitutionsService],
})
export class InstitutionModule {}
