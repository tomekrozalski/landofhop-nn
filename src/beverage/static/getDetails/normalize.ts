import { get, isBoolean, isEmpty, isNumber, unset } from 'lodash';

import { LanguageValue } from 'utils/types';
import { Code } from 'language/utils/types';
import { Details, RawData } from 'beverage/utils/types';
import { languageIdToCode } from 'beverage/utils/helpers';
import { Tale } from 'beverage/utils/types/fragments';

type Props = {
  beverage: RawData;
  language: string;
  languageList: Code[];
};

const normalize = ({ beverage, language, languageList }: Props): Details => {
  const transformLanguage = (values: LanguageValue[] | Tale[]) =>
    languageIdToCode({
      languageList,
      values,
    });

  const translate = (
    values: LanguageValue[] | Tale[],
    options?: { strict?: boolean },
  ) => {
    const formatted = transformLanguage(values);

    return options?.strict
      ? formatted.find(item => item?.language === language)
      : formatted.find(item => item?.language === language) || formatted[0];
  };

  const label = query => get(beverage, `label.${query}`);
  const producer = query => get(beverage, `producer.${query}`);
  const editorial = query => get(beverage, `editorial.${query}`);

  const normalizeExtract = ({ relate, unit, value }) => ({
    relate,
    unit,
    value: +value,
  });

  const normalizeAlcohol = alcohol => ({
    ...(alcohol.relate && { relate: alcohol.relate }),
    ...(alcohol.unit && { unit: alcohol.unit }),
    ...(alcohol.value && { value: +alcohol.value }),
    ...(alcohol.scope && { scope: alcohol.scope }),
  });

  const formattedObject = {
    id: beverage.id,
    shortId: beverage.shortId,
    badge: beverage.badge,
    name: translate(label('general.name')),
    series: {
      ...(label('general.series') && {
        label: transformLanguage(label('general.series')),
      }),
      ...(producer('general.series') && {
        producer: transformLanguage(producer('general.series')),
      }),
    },
    brand: {
      badge: label('general.brand.badge'),
      name: translate(label('general.brand.name')),
      ...(label('general.brand.consortium') && {
        consortium: translate(label('general.brand.consortium')),
      }),
      shortId: label('general.brand.shortId'),
    },
    cooperation: {
      ...(!isEmpty(label('general.cooperation')) && {
        label: label('general.cooperation').map(({ name }) => translate(name)),
      }),
      ...(!isEmpty(producer('general.cooperation')) && {
        producer: producer('general.cooperation').map(({ name }) =>
          translate(name),
        ),
      }),
      ...(!isEmpty(editorial('general.cooperation')) && {
        editorial: editorial('general.cooperation').map(({ name }) =>
          translate(name),
        ),
      }),
    },
    contract: {
      ...(!isEmpty(label('general.contract')) && {
        label: translate(label('general.contract.name')),
      }),
      ...(!isEmpty(producer('general.contract')) && {
        producer: translate(producer('general.contract.name')),
      }),
      ...(!isEmpty(editorial('general.contract')) && {
        editorial: translate(editorial('general.contract.name')),
      }),
    },
    isContract: {
      ...(isBoolean(label('general.isContract')) && {
        label: label('general.isContract'),
      }),
      ...(isBoolean(producer('general.isContract')) && {
        producer: producer('general.isContract'),
      }),
      ...(isBoolean(editorial('general.isContract')) && {
        editorial: editorial('general.isContract'),
      }),
    },
    place: {
      ...(label('general.place.city') && {
        label: {
          city: translate(label('general.place.city')),
          country: translate(label('general.place.country.name')),
        },
      }),
      ...(producer('general.place.city') && {
        producer: {
          city: translate(producer('general.place.city')),
          country: translate(producer('general.place.country.name')),
        },
      }),
      ...(editorial('general.place.city') && {
        editorial: {
          city: translate(editorial('general.place.city')),
          country: translate(editorial('general.place.country.name')),
        },
      }),
    },
    remark: {
      ...(label('general.remark') && {
        label: translate(label('general.remark')),
      }),
      ...(producer('general.remark') && {
        producer: translate(producer('general.remark')),
      }),
    },
    tale: {
      ...(label('general.tale') && {
        label: translate(label('general.tale')),
      }),
      ...(producer('general.tale') && {
        producer: translate(producer('general.tale')),
      }),
    },
    ...(label('general.barcode') && { barcode: label('general.barcode') }),
    beverageType: {
      ...(label('brewing.beverageType') && {
        label: label('brewing.beverageType'),
      }),
      ...(producer('brewing.beverageType') && {
        producer: producer('brewing.beverageType'),
      }),
      ...(editorial('brewing.beverageType') && {
        editorial: editorial('brewing.beverageType'),
      }),
    },
    fermentation: {
      ...(!isEmpty(label('brewing.fermentation')) && {
        label: label('brewing.fermentation'),
      }),
      ...(!isEmpty(producer('brewing.fermentation')) && {
        producer: producer('brewing.fermentation'),
      }),
      ...(!isEmpty(editorial('brewing.fermentation')) && {
        editorial: editorial('brewing.fermentation'),
      }),
    },
    extract: {
      ...(!isEmpty(label('brewing.extract')) && {
        label: normalizeExtract(label('brewing.extract')),
      }),
      ...(!isEmpty(producer('brewing.extract')) && {
        producer: normalizeExtract(producer('brewing.extract')),
      }),
    },
    alcohol: {
      ...(!isEmpty(label('brewing.alcohol')) && {
        label: normalizeAlcohol(label('brewing.alcohol')),
      }),
      ...(!isEmpty(producer('brewing.alcohol')) && {
        producer: normalizeAlcohol(producer('brewing.alcohol')),
      }),
      ...(!isEmpty(editorial('brewing.alcohol')) && {
        editorial: normalizeAlcohol(editorial('brewing.alcohol')),
      }),
    },
    filtration: {
      ...(isBoolean(label('brewing.filtration')) && {
        label: label('brewing.filtration'),
      }),
      ...(isBoolean(producer('brewing.filtration')) && {
        producer: producer('brewing.filtration'),
      }),
      ...(isBoolean(editorial('brewing.filtration')) && {
        editorial: editorial('brewing.filtration'),
      }),
    },
    pasteurization: {
      ...(isBoolean(label('brewing.pasteurization')) && {
        label: label('brewing.pasteurization'),
      }),
      ...(isBoolean(producer('brewing.pasteurization')) && {
        producer: producer('brewing.pasteurization'),
      }),
      ...(isBoolean(editorial('brewing.pasteurization')) && {
        editorial: editorial('brewing.pasteurization'),
      }),
    },
    isAged: {
      ...(!isEmpty(label('brewing.aged')) && { label: true }),
      ...(!isEmpty(producer('brewing.aged')) && { producer: true }),
      ...(!isEmpty(editorial('brewing.aged')) && { editorial: true }),
    },
    aged: {
      ...(!isEmpty(label('brewing.aged')) &&
        (label('brewing.aged').length !== 1 ||
          !isEmpty(label('brewing.aged')[0])) && {
          label: label('brewing.aged'),
        }),
      ...(!isEmpty(producer('brewing.aged')) &&
        (producer('brewing.aged').length !== 1 ||
          !isEmpty(producer('brewing.aged')[0])) && {
          producer: producer('brewing.aged'),
        }),
      ...(!isEmpty(editorial('brewing.aged')) &&
        (editorial('brewing.aged').length !== 1 ||
          !isEmpty(editorial('brewing.aged')[0])) && {
          editorial: editorial('brewing.aged'),
        }),
    },
    style: {
      ...(!isEmpty(label('brewing.style')) && {
        label: transformLanguage(label('brewing.style')),
      }),
      ...(!isEmpty(producer('brewing.style')) && {
        producer: transformLanguage(producer('brewing.style')),
      }),
      ...(!isEmpty(editorial('brewing.style')) && {
        editorial: transformLanguage(editorial('brewing.style')),
      }),
    },
    isDryHopped: {
      ...((label('brewing.isDryHopped') ||
        !isEmpty(label('brewing.dryHopped.hops'))) && { label: true }),
      ...((producer('brewing.isDryHopped') ||
        !isEmpty(producer('brewing.dryHopped.hops'))) && { producer: true }),
      ...((editorial('brewing.isDryHopped') ||
        !isEmpty(editorial('brewing.dryHopped.hops'))) && { editorial: true }),
    },
    dryHopped: {
      ...(!isEmpty(label('brewing.dryHopped.hops')) && {
        label: label('brewing.dryHopped.hops').map(({ name }) =>
          translate(name),
        ),
      }),
      ...(!isEmpty(producer('brewing.dryHopped.hops')) && {
        producer: producer('brewing.dryHopped.hops').map(({ name }) =>
          translate(name),
        ),
      }),
      ...(!isEmpty(editorial('brewing.dryHopped.hops')) && {
        editorial: editorial('brewing.dryHopped.hops').map(({ name }) =>
          translate(name),
        ),
      }),
    },
    hopRate: {
      ...(!isEmpty(label('brewing.hopRate')) && {
        label: {
          unit: label('brewing.hopRate.unit'),
          value: +label('brewing.hopRate.value'),
        },
      }),
      ...(!isEmpty(producer('brewing.hopRate')) && {
        producer: {
          unit: producer('brewing.hopRate.unit'),
          value: +producer('brewing.hopRate.value'),
        },
      }),
    },
    expirationDate: {
      ...(!isEmpty(label('brewing.expirationDate')) && {
        label: label('brewing.expirationDate'),
      }),
      ...(!isEmpty(producer('brewing.expirationDate')) && {
        producer: producer('brewing.expirationDate'),
      }),
    },
    ingredientsDescription: {
      ...(label('ingredients.description') && {
        label: translate(label('ingredients.description'), { strict: true }),
      }),
      ...(producer('ingredients.description') && {
        producer: translate(producer('ingredients.description'), {
          strict: true,
        }),
      }),
    },
    ingredientsList: {
      ...(!isEmpty(label('ingredients.list')) && {
        label: label('ingredients.list').map(({ name, type }) => ({
          name: translate(name),
          type,
        })),
      }),
      ...(!isEmpty(producer('ingredients.list')) && {
        producer: producer('ingredients.list').map(({ name, type }) => ({
          name: translate(name),
          type,
        })),
      }),
    },
    smokedMalt: {
      ...(isBoolean(label('ingredients.smokedMalt')) && {
        label: label('ingredients.smokedMalt'),
      }),
      ...(isBoolean(producer('ingredients.smokedMalt')) && {
        producer: producer('ingredients.smokedMalt'),
      }),
    },
    bitterness: {
      ...(isNumber(label('impressions.bitterness')) && {
        label: label('impressions.bitterness'),
      }),
      ...(isNumber(producer('impressions.bitterness')) && {
        producer: producer('impressions.bitterness'),
      }),
    },
    sweetness: {
      ...(isNumber(label('impressions.sweetness')) && {
        label: label('impressions.sweetness'),
      }),
      ...(isNumber(producer('impressions.sweetness')) && {
        producer: producer('impressions.sweetness'),
      }),
    },
    fullness: {
      ...(isNumber(label('impressions.fullness')) && {
        label: label('impressions.fullness'),
      }),
      ...(isNumber(producer('impressions.fullness')) && {
        producer: producer('impressions.fullness'),
      }),
    },
    power: {
      ...(isNumber(label('impressions.power')) && {
        label: label('impressions.power'),
      }),
      ...(isNumber(producer('impressions.power')) && {
        producer: producer('impressions.power'),
      }),
    },
    hoppyness: {
      ...(isNumber(label('impressions.hoppyness')) && {
        label: label('impressions.hoppyness'),
      }),
      ...(isNumber(producer('impressions.hoppyness')) && {
        producer: producer('impressions.hoppyness'),
      }),
    },
    temperature: {
      ...(!isEmpty(label('impressions.temperature')) && {
        label: {
          ...label('impressions.temperature'),
          from: +label('impressions.temperature.from'),
          to: +label('impressions.temperature.to'),
        },
      }),
      ...(!isEmpty(producer('impressions.temperature')) && {
        producer: {
          ...producer('impressions.temperature'),
          from: +producer('impressions.temperature.from'),
          to: +producer('impressions.temperature.to'),
        },
      }),
    },
    color: {
      ...(editorial('impressions.color') && {
        editorial: editorial('impressions.color'),
      }),
    },
    clarity: {
      ...(editorial('impressions.clarity') && {
        editorial: editorial('impressions.clarity'),
      }),
    },
    container: {
      color: label('container.color'),
      material: label('container.material'),
      unit: label('container.unit'),
      type: label('container.type'),
      value: +label('container.value'),
      ...(isBoolean(label('container.hasCork')) && {
        hasCork: label('container.hasCork'),
      }),
      ...(isBoolean(label('container.hasCapWireFlip')) && {
        hasCapWireFlip: label('container.hasCapWireFlip'),
      }),
    },
    price: {
      ...(!isEmpty(label('price')) && {
        label: label('price').map(({ value, ...rest }) => ({
          ...rest,
          value: +value,
        })),
      }),
      ...(!isEmpty(producer('price')) && {
        producer: producer('price').map(({ value, ...rest }) => ({
          ...rest,
          value: +value,
        })),
      }),
      ...(!isEmpty(editorial('price')) && {
        editorial: editorial('price').map(({ value, ...rest }) => ({
          ...rest,
          value: +value,
        })),
      }),
    },
    photos: {
      ...(editorial('photos.cap') && { cap: true }),
      ...(editorial('photos.gallery') && {
        gallery: editorial('photos.gallery'),
      }),
      ...(editorial('photos.outlines.gallery') && {
        outlines: {
          gallery: editorial('photos.outlines.gallery'),
        },
      }),
    },
    added: beverage.added,
    ...(beverage.updated && { updated: beverage.updated }),
  };

  const deleteIfEmpty = (fields: string[]) => {
    fields.forEach(field => {
      if (isEmpty(get(formattedObject, field))) {
        unset(formattedObject, field);
      }
    });
  };

  deleteIfEmpty([
    'series',
    'cooperation',
    'contract',
    'isContract',
    'place',
    'remark',
    'tale.producer',
    'tale',
    'beverageType',
    'fermentation',
    'extract',
    'alcohol',
    'filtration',
    'pasteurization',
    'isAged',
    'aged',
    'style',
    'isDryHopped',
    'dryHopped',
    'hopRate',
    'expirationDate',
    'ingredientsDescription',
    'ingredientsList',
    'smokedMalt',
    'bitterness',
    'sweetness',
    'fullness',
    'power',
    'hoppyness',
    'temperature',
    'color',
    'clarity',
    'price',
    'photos',
  ]);

  return formattedObject;
};

export default normalize;
