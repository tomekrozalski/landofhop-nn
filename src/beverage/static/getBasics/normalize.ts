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
}: RawData): Basics => ({
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
});

export default normalize;
