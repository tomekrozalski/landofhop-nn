import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { Institution } from 'institution/utils/types';
import { AddNewInstitutionService } from './addNewInstitution.service';

@Controller('institution')
export class AddNewInstitutionController {
  constructor(private readonly institutionService: AddNewInstitutionService) {}

  @Post()
  @UseGuards(AuthGuard)
  async addNewInstitution(
    @Body('badge') badge: string,
    @Body('name')
    name: {
      lang: string;
      value: string;
    }[],
    @Body('ownedBy') ownedBy: string,
    @Body('shortId') shortId: string,
    @Body('website') website: string,
  ) {
    const response: Institution[] = await this.institutionService.addNewInstitution(
      {
        badge,
        name,
        ownedBy,
        shortId,
        website,
      },
    );

    return response;
  }
}
