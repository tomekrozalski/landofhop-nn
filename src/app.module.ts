import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AddShortIdMiddleware } from './utils/middlewares';
import { UserModule } from './user/user.module';
import { BeverageModule } from './beverage/beverage.module';
// import { IngredientModule } from './ingredient/ingredient.module';
import { InstitutionModule } from './institution/institution.module';
import { PlaceModule } from './place/place.module';
import { CountryModule } from './country/country.module';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [
    UserModule,
    BeverageModule,
    // IngredientModule,
    InstitutionModule,
    PlaceModule,
    CountryModule,
    LanguageModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@landofhop-ku9ye.mongodb.net/landofhop?retryWrites=true`,
    ),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AddShortIdMiddleware)
      .forRoutes(
        { path: 'place', method: RequestMethod.POST },
        { path: 'institution', method: RequestMethod.POST },
        { path: 'beverage', method: RequestMethod.POST },
      );
  }
}
