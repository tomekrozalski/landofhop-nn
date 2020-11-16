import { get, isBoolean, isEmpty, isNumber, unset } from 'lodash';

import { LanguageValue } from 'utils/types';
import { Details, RawData } from 'beverage/utils/types';
import { Tale } from 'beverage/utils/types/fragments';
import languageIdToCode from './languageIdToCode';

const detailsNormalizer = ({
  beverage,
  transformLanguageIds,
}: {
  beverage: RawData;
  transformLanguageIds: boolean;
}): Details => {
  const transformLanguage = (values: LanguageValue[] | Tale[]) => {
    if (transformLanguageIds) {
      return languageIdToCode({
        languages: beverage.languages,
        values,
      });
    }

    return values;
  };

  const label = query => get(beverage, `label.${query}`);
  const producer = query => get(beverage, `producer.${query}`);
  const editorial = query => get(beverage, `editorial.${query}`);

  const normalizeBrand = institution => ({
    badge: institution.badge,
    id: institution.id,
    name: transformLanguage(institution.name),
    shortId: institution.shortId,
    ...(institution.website && { website: institution.website }),
    ...(institution.consortium && {
      consortium: institution.consortium,
    }),
  });

  const normalizePlace = place => ({
    ...(place.city && { city: transformLanguage(place.city) }),
    ...(place.coordinates && {
      coordinates: place.coordinates.map(item => +item),
    }),
    country: transformLanguage(place.country.name),
    id: place.id,
    institution: transformLanguage(place.institution.name),
  });

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
    name: transformLanguage(label('general.name')),
    series: {
      ...(label('general.series') && {
        label: transformLanguage(label('general.series')),
      }),
      ...(producer('general.series') && {
        producer: transformLanguage(producer('general.series')),
      }),
    },
    brand: normalizeBrand(label('general.brand')),
    cooperation: {
      ...(!isEmpty(label('general.cooperation')) && {
        label: label('general.cooperation').map(normalizeBrand),
      }),
      ...(!isEmpty(producer('general.cooperation')) && {
        producer: producer('general.cooperation').map(normalizeBrand),
      }),
      ...(!isEmpty(editorial('general.cooperation')) && {
        editorial: editorial('general.cooperation').map(normalizeBrand),
      }),
    },
    contract: {
      ...(!isEmpty(label('general.contract')) && {
        label: normalizeBrand(label('general.contract')),
      }),
      ...(!isEmpty(producer('general.contract')) && {
        producer: normalizeBrand(producer('general.contract')),
      }),
      ...(!isEmpty(editorial('general.contract')) && {
        editorial: normalizeBrand(editorial('general.contract')),
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
        label: normalizePlace(label('general.place')),
      }),
      ...(producer('general.place.city') && {
        producer: normalizePlace(producer('general.place')),
      }),
      ...(editorial('general.place.city') && {
        editorial: normalizePlace(editorial('general.place')),
      }),
    },
    remark: {
      ...(label('general.remark') && {
        label: transformLanguage(label('general.remark')),
      }),
      ...(producer('general.remark') && {
        producer: transformLanguage(producer('general.remark')),
      }),
    },
    tale: {
      ...(label('general.tale') && {
        label: transformLanguage(label('general.tale')),
      }),
      ...(producer('general.tale') && {
        producer: transformLanguage(producer('general.tale')),
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
        label: label('brewing.dryHopped.hops').map(({ id, name, type }) => ({
          id,
          name,
          type,
        })),
      }),
      ...(!isEmpty(producer('brewing.dryHopped.hops')) && {
        producer: producer('brewing.dryHopped.hops').map(
          ({ id, name, type }) => ({
            id,
            name,
            type,
          }),
        ),
      }),
      ...(!isEmpty(editorial('brewing.dryHopped.hops')) && {
        editorial: editorial('brewing.dryHopped.hops').map(
          ({ id, name, type }) => ({
            id,
            name,
            type,
          }),
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
        label: transformLanguage(label('ingredients.description')),
      }),
      ...(producer('ingredients.description') && {
        producer: transformLanguage(producer('ingredients.description')),
      }),
    },
    ingredientsList: {
      ...(!isEmpty(label('ingredients.list')) && {
        label: label('ingredients.list').map(({ id, badge, name, type }) => ({
          id,
          badge,
          name: transformLanguage(name),
          type,
        })),
      }),
      ...(!isEmpty(producer('ingredients.list')) && {
        producer: producer('ingredients.list').map(
          ({ id, badge, name, type }) => ({
            id,
            badge,
            name: transformLanguage(name),
            type,
          }),
        ),
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
      ...(editorial('photos.cover') && { cover: editorial('photos.cover') }),
      ...(editorial('photos.gallery') && {
        gallery: editorial('photos.gallery'),
      }),
      ...(editorial('photos.outlines') && {
        outlines: editorial('photos.outlines'),
      }),
    },
    ...(editorial('notes') && { notes: editorial('notes') }),
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

export default detailsNormalizer;
