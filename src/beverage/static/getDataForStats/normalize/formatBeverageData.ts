import { isEmpty } from 'lodash';

import { LanguageValue } from 'utils/types';
import { languageIdToCode } from 'beverage/utils/helpers';
import { Code } from 'language/utils/types';
import { RawData } from '../RawData.d';
import { FormattedBeverage } from './FormattedBeverage';

const normalizeAlcohol = alcohol => ({
  ...(alcohol.relate && { relate: alcohol.relate }),
  ...(alcohol.unit && { unit: alcohol.unit }),
  ...(alcohol.value && { value: +alcohol.value }),
  ...(alcohol.scope && { scope: alcohol.scope }),
});

const normalizeExtract = ({ relate, unit, value }) => ({
  relate,
  unit,
  value: +value,
});

const formatBeverageData = ({
  language,
  languageList,
}: {
  language: string;
  languageList: Code[];
}) => ({
  added,
  alcohol,
  brand,
  container,
  extract,
  fermentation,
  id,
}: RawData): FormattedBeverage => {
  const transformLanguage = (values: LanguageValue[]) =>
    languageIdToCode({
      languageList,
      values,
    });

  const translate = (values: LanguageValue[]): LanguageValue => {
    const formatted = transformLanguage(values);

    return formatted.find(item => item?.language === language) || formatted[0];
  };

  return {
    added,
    ...(!isEmpty(alcohol) && {
      alcohol: {
        ...(alcohol.label && {
          label: normalizeAlcohol(alcohol.label),
        }),
        ...(alcohol.producer && {
          producer: normalizeAlcohol(alcohol.producer),
        }),
        ...(alcohol.editorial && {
          editorial: normalizeAlcohol(alcohol.editorial),
        }),
      },
    }),
    id,
    brand: {
      id: brand.id,
      name: translate(brand.name),
    },
    ...(!isEmpty(extract) && {
      extract: {
        ...(extract.label && {
          label: normalizeExtract(extract.label),
        }),
        ...(extract.producer && {
          producer: normalizeExtract(extract.producer),
        }),
      },
    }),
    ...(!isEmpty(fermentation) && { fermentation }),
    container,
  };
};

export default formatBeverageData;
