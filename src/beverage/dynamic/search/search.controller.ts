import { Body, Controller, Post } from '@nestjs/common';

import { Basics } from 'beverage/utils/types';
import { SearchBeverageService } from './search.service';

@Controller('beverage')
export class SearchBeverageController {
  constructor(private readonly beverageService: SearchBeverageService) {}

  @Post('search')
  async search(
    @Body('language') language: string,
    @Body('phrase') phrase: string,
  ): Promise<Basics[]> {
    const beverage: Basics[] = await this.beverageService.search({
      language,
      phrase,
    });

    return beverage;
  }
}
