import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from 'utils/guards';
import { GalleryService } from './gallery.service';

@Controller('beverage')
export class GalleryController {
  constructor(private readonly beverageService: GalleryService) {}

  @Post('gallery')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async saveGallery(
    @Body('badge') badge: string,
    @Body('brand') brand: string,
    @Body('id') id: string,
    @UploadedFiles() images,
    @Body('shortId') shortId: string,
  ) {
    const result: boolean = await this.beverageService.saveGallery({
      badge,
      brand,
      id,
      images,
      shortId,
    });
    return result;
  }

  @Delete('gallery')
  @UseGuards(AuthGuard)
  async removeGallery(
    @Body('badge') badge: string,
    @Body('brand') brand: string,
    @Body('files') files: number,
    @Body('id') id: string,
    @Body('shortId') shortId: string,
  ) {
    const result: boolean = await this.beverageService.removeGallery({
      badge,
      brand,
      files,
      id,
      shortId,
    });
    return result;
  }
}
