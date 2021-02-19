import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'utils/guards';
import { CapService } from './cap.service';

@Controller('beverage')
export class CapController {
  constructor(private readonly beverageService: CapService) {}

  @Post('cap')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async saveCap(
    @Body('badge') badge: string,
    @Body('brand') brand: string,
    @Body('id') id: string,
    @UploadedFile() image,
    @Body('shortId') shortId: string,
  ) {
    const result: boolean = await this.beverageService.saveCap({
      badge,
      brand,
      id,
      image,
      shortId,
    });
    return result;
  }

  @Delete('cap')
  async removeCap(
    @Body('badge') badge: string,
    @Body('brand') brand: string,
    @Body('id') id: string,
    @Body('shortId') shortId: string,
  ) {
    const result: boolean = await this.beverageService.removeCap({
      badge,
      brand,
      id,
      shortId,
    });
    return result;
  }
}
