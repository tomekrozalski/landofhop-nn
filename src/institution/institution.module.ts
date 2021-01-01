import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import InstitutionSchema from 'institution/utils/institution.schema';
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
  controllers: [GetAllInstitutionsController],
  providers: [GetAllInstitutionsService],
})
export class InstitutionModule {}
