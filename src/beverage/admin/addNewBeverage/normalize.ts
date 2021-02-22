import { isBoolean, isNumber } from 'lodash';

import { DataType } from './Data.type';

const normalize = ({
  added,
  aged = {},
  alcohol = {},
  badge,
  barcode,
  bitterness = {},
  brand,
  clarity = {},
  color = {},
  container,
  contract = {},
  cooperation = {},
  dryHopped = {},
  expirationDate = {},
  extract = {},
  fermentation = {},
  filtration = {},
  fullness = {},
  hoppyness = {},
  hopRate = {},
  ingredientsDescription = {},
  ingredientsList = {},
  isContract = {},
  isDryHopped = {},
  name,
  notes,
  pasteurization = {},
  place = {},
  power = {},
  price = {},
  remark = {},
  series = {},
  smokedMalt = {},
  sweetness = {},
  tale = {},
  updated,
  shortId,
  style = {},
  temperature = {},
}: DataType) => {
  const hasLabel = {
    brewing:
      fermentation.label ||
      style.label ||
      alcohol.label ||
      extract.label ||
      isBoolean(filtration.label) ||
      isBoolean(pasteurization.label) ||
      aged.label ||
      hopRate.label ||
      dryHopped.label ||
      isBoolean(isDryHopped.label) ||
      expirationDate.label,
    impressions:
      isNumber(bitterness.label) ||
      isNumber(sweetness.label) ||
      isNumber(fullness.label) ||
      isNumber(power.label) ||
      isNumber(hoppyness.label) ||
      temperature.label,
    ingredients:
      ingredientsDescription.label || ingredientsList.label || smokedMalt.label,
  };

  const hasProducer = {
    general:
      series.producer ||
      contract.producer ||
      isContract.producer ||
      cooperation.producer ||
      place.producer ||
      remark.producer ||
      tale.producer,
    brewing:
      fermentation.producer ||
      style.producer ||
      alcohol.producer ||
      extract.producer ||
      isBoolean(filtration.producer) ||
      isBoolean(pasteurization.producer) ||
      aged.producer ||
      hopRate.producer ||
      dryHopped.producer ||
      isBoolean(isDryHopped.producer) ||
      expirationDate.producer,
    impressions:
      isNumber(bitterness.producer) ||
      isNumber(sweetness.producer) ||
      isNumber(fullness.producer) ||
      isNumber(power.producer) ||
      isNumber(hoppyness.producer) ||
      temperature.producer,
    ingredients:
      ingredientsDescription.producer ||
      ingredientsList.producer ||
      smokedMalt.producer,
  };

  const hasEditorial = {
    brewing:
      fermentation.editorial ||
      style.editorial ||
      alcohol.editorial ||
      isBoolean(filtration.editorial) ||
      isBoolean(pasteurization.editorial) ||
      aged.editorial ||
      dryHopped.editorial ||
      isBoolean(isDryHopped.editorial),
    general:
      contract.editorial ||
      isContract.editorial ||
      cooperation.editorial ||
      place.editorial ||
      remark.editorial,
    impressions: color.editorial || clarity.editorial,
  };

  return {
    badge,
    label: {
      general: {
        name,
        ...(series.label && { series: series.label }),
        brand,
        ...(contract.label && { contract: contract.label }),
        ...(isBoolean(isContract.label) && { isContract: isContract.label }),
        ...(cooperation.label && { cooperation: cooperation.label }),
        ...(place.label && { place: place.label }),
        ...(remark.label && { remark: remark.label }),
        ...(tale.label && { tale: tale.label }),
        ...(barcode && { barcode }),
      },
      ...(hasLabel.brewing && {
        brewing: {
          ...(fermentation.label && { fermentation: fermentation.label }),
          ...(style.label && { style: style.label }),
          ...(alcohol.label && { alcohol: alcohol.label }),
          ...(extract.label && { extract: extract.label }),
          ...(isBoolean(filtration.label) && { filtration: filtration.label }),
          ...(isBoolean(pasteurization.label) && {
            pasteurization: pasteurization.label,
          }),
          ...(aged.label && { aged: aged.label }),
          ...(hopRate.label && { hopRate: hopRate.label }),
          ...(dryHopped.label && { dryHopped: { hops: dryHopped.label } }),
          ...(isBoolean(isDryHopped.label) && {
            isDryHopped: isDryHopped.label,
          }),
          ...(expirationDate.label && { expirationDate: expirationDate.label }),
        },
      }),
      ...(hasLabel.ingredients && {
        ingredients: {
          ...(ingredientsDescription.label && {
            description: ingredientsDescription.label,
          }),
          ...(ingredientsList.label && {
            list: ingredientsList.label,
          }),
          ...(isBoolean(smokedMalt.label) && {
            smokedMalt: smokedMalt.label,
          }),
        },
      }),
      ...(hasLabel.impressions && {
        impressions: {
          ...(isNumber(bitterness.label) && { bitterness: bitterness.label }),
          ...(isNumber(sweetness.label) && { sweetness: sweetness.label }),
          ...(isNumber(fullness.label) && { fullness: fullness.label }),
          ...(isNumber(power.label) && { power: power.label }),
          ...(isNumber(hoppyness.label) && { hoppyness: hoppyness.label }),
          ...(temperature.label && { temperature: temperature.label }),
        },
      }),
      container,
      ...(price.label && {
        price: price.label,
      }),
    },
    ...((hasProducer.general ||
      hasProducer.brewing ||
      hasProducer.ingredients ||
      hasProducer.impressions ||
      price.producer) && {
      producer: {
        ...(hasProducer.general && {
          general: {
            ...(series.producer && { series: series.producer }),
            ...(contract.producer && { contract: contract.producer }),
            ...(isBoolean(isContract.producer) && {
              isContract: isContract.producer,
            }),
            ...(cooperation.producer && { cooperation: cooperation.producer }),
            ...(place.producer && { place: place.producer }),
            ...(remark.producer && { remark: remark.producer }),
            ...(tale.producer && { tale: tale.producer }),
          },
        }),
        ...(hasProducer.brewing && {
          brewing: {
            ...(fermentation.producer && {
              fermentation: fermentation.producer,
            }),
            ...(style.producer && { style: style.producer }),
            ...(alcohol.producer && { alcohol: alcohol.producer }),
            ...(extract.producer && { extract: extract.producer }),
            ...(isBoolean(filtration.producer) && {
              filtration: filtration.producer,
            }),
            ...(isBoolean(pasteurization.producer) && {
              pasteurization: pasteurization.producer,
            }),
            ...(aged.producer && { aged: aged.producer }),
            ...(hopRate.producer && { hopRate: hopRate.producer }),
            ...(dryHopped.producer && {
              dryHopped: { hops: dryHopped.producer },
            }),
            ...(isBoolean(isDryHopped.producer) && {
              isDryHopped: isDryHopped.producer,
            }),
            ...(expirationDate.producer && {
              expirationDate: expirationDate.producer,
            }),
          },
        }),
        ...(hasProducer.ingredients && {
          ingredients: {
            ...(ingredientsDescription.producer && {
              description: ingredientsDescription.producer,
            }),
            ...(ingredientsList.producer && {
              list: ingredientsList.producer,
            }),
            ...(isBoolean(smokedMalt.producer) && {
              smokedMalt: smokedMalt.producer,
            }),
          },
        }),
        ...(hasProducer.impressions && {
          impressions: {
            ...(isNumber(bitterness.producer) && {
              bitterness: bitterness.producer,
            }),
            ...(isNumber(sweetness.producer) && {
              sweetness: sweetness.producer,
            }),
            ...(isNumber(fullness.producer) && { fullness: fullness.producer }),
            ...(isNumber(power.producer) && { power: power.producer }),
            ...(isNumber(hoppyness.producer) && {
              hoppyness: hoppyness.producer,
            }),
            ...(temperature.producer && { temperature: temperature.producer }),
          },
        }),
        ...(price.producer && {
          price: price.producer,
        }),
      },
    }),
    ...((hasEditorial.general ||
      hasEditorial.brewing ||
      price.editorial ||
      notes) && {
      editorial: {
        ...(hasEditorial.general && {
          general: {
            ...(contract.editorial && { contract: contract.editorial }),
            ...(isBoolean(isContract.editorial) && {
              isContract: isContract.editorial,
            }),
            ...(cooperation.editorial && {
              cooperation: cooperation.editorial,
            }),
            ...(place.editorial && { place: place.editorial }),
            ...(remark.editorial && { remark: remark.editorial }),
          },
        }),
        ...(hasEditorial.brewing && {
          brewing: {
            ...(fermentation.editorial && {
              fermentation: fermentation.editorial,
            }),
            ...(style.editorial && { style: style.editorial }),
            ...(alcohol.editorial && { alcohol: alcohol.editorial }),
            ...(isBoolean(filtration.editorial) && {
              filtration: filtration.editorial,
            }),
            ...(isBoolean(pasteurization.editorial) && {
              pasteurization: pasteurization.editorial,
            }),
            ...(aged.editorial && { aged: aged.editorial }),
            ...(dryHopped.editorial && {
              dryHopped: { hops: dryHopped.editorial },
            }),
            ...(isBoolean(isDryHopped.editorial) && {
              isDryHopped: isDryHopped.editorial,
            }),
          },
        }),
        ...(hasEditorial.impressions && {
          impressions: {
            ...(color.editorial && {
              color: color.editorial,
            }),
            ...(clarity.editorial && {
              clarity: clarity.editorial,
            }),
          },
        }),
        ...(price.editorial && {
          price: price.editorial,
        }),
        ...(notes && { notes }),
      },
    }),
    added,
    ...(updated && { updated }),
    shortId,
  };
};

export default normalize;
