import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'utils/guards';
import { Institution } from 'institution/utils/types';
import { GetAllInstitutionsService } from './getAllInstitutions.service';

@Controller('institution')
export class GetAllInstitutionsController {
  constructor(private readonly institutionService: GetAllInstitutionsService) {}

  @Get('getAll')
  @UseGuards(AuthGuard)
  async getAllInstitutions() {
    const response: Institution[] = await this.institutionService.getAllInstitutions();

    return response;
  }
}
