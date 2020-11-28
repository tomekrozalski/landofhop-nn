import { isEmpty, unset } from 'lodash';

import { LanguageValue } from 'utils/types';
import { Basics } from 'beverage/utils/types';
import { languageIdToCode } from 'beverage/utils/helpers';
import { RawData } from './rawData.type';

type Props = {
  beverage: RawData;
  language: string;
};

const normalize = ({ beverage, language }: Props): Basics => {
  const {
    added,
    badge,
    brand,
    container,
    id,
    languages,
    name,
    photos,
    shortId,
  } = beverage;

  const transformLanguage = (values: LanguageValue[]) =>
    languageIdToCode({ languages, values });

  const translate = (values: LanguageValue[]) => {
    const formatted = transformLanguage(values);
    return formatted.find(item => item?.language === language) || formatted[0];
  };

  const formatted = {
    id,
    shortId,
    badge,
    brand: {
      badge: brand.badge,
      name: translate(brand.name),
    },
    name: translate(name),
    photos,
    container,
    added,
  };

  if (isEmpty(formatted.photos.cover)) {
    unset(formatted, 'photos.cover');
  }

  if (isEmpty(formatted.photos.outlines)) {
    unset(formatted, 'photos.outlines');
  }

  if (isEmpty(formatted.photos)) {
    unset(formatted, 'photos');
  }

  return formatted;
};

export default normalize;
