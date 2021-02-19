import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'utils/guards';
import { CoverService } from './cover.service';

@Controller('beverage')
export class CoverController {
  constructor(private readonly beverageService: CoverService) {}

  @Post('cover')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async saveCover(
    @Body('badge') badge: string,
    @Body('brand') brand: string,
    @Body('id') id: string,
    @UploadedFile() image,
    @Body('shortId') shortId: string,
  ) {
    const result: boolean = await this.beverageService.saveCover({
      badge,
      brand,
      id,
      image,
      shortId,
    });

    return result;
  }
}
