import { Details, RawData } from 'beverage/utils/types';
import { detailsNormalizer, languageIdToCode } from 'beverage/utils/helpers';

const normalize = (beverage: RawData): Details => {
  const transformLanguage = ({ values }: { values: any[] }) =>
    languageIdToCode({
      languages: beverage.languages,
      values,
    });

  return detailsNormalizer({ beverage, transformLanguage });
};

export default normalize;
