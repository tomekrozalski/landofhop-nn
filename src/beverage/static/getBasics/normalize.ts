import { isEmpty, unset } from 'lodash';

import { Basics } from 'beverage/utils/types';
import { languageIdToCode } from 'beverage/utils/helpers';
import { RawData } from './rawData.type';

const normalize = ({
  added,
  badge,
  brand,
  container,
  id,
  languages,
  name,
  photos,
  shortId,
}: RawData): Basics => {
  const formatted = {
    id,
    shortId,
    badge,
    brand: {
      badge: brand.badge,
      name: languageIdToCode({ languages, values: brand.name }),
    },
    name: languageIdToCode({ languages, values: name }),
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
