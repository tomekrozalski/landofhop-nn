import { isEmpty, unset } from 'lodash';

import { LanguageValue } from 'utils/types';
import { languageIdToCode } from 'beverage/utils/helpers';
import { Code } from 'language/utils/types';
import { RawData } from '../RawData.d';

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
}) => (item: RawData) => {
  const formattedItem = { ...item };

  const transformLanguage = (values: LanguageValue[]) =>
    languageIdToCode({
      languageList,
      values,
    });

  const translate = (values: LanguageValue[]) => {
    const formatted = transformLanguage(values);

    return formatted.find(item => item?.language === language) || formatted[0];
  };

  formattedItem.brand.name = translate(formattedItem.brand.name);

  ['label', 'producer', 'editorial'].forEach(part => {
    if (formattedItem.alcohol[part]) {
      formattedItem.alcohol[part] = normalizeAlcohol(
        formattedItem.alcohol[part],
      );
    }
  });

  ['label', 'producer'].forEach(part => {
    if (formattedItem.extract[part]) {
      formattedItem.extract[part] = normalizeExtract(
        formattedItem.extract[part],
      );
    }
  });

  if (isEmpty(item.alcohol)) {
    unset(formattedItem, 'alcohol');
  }

  if (isEmpty(item.extract)) {
    unset(formattedItem, 'extract');
  }

  if (isEmpty(item.fermentation)) {
    unset(formattedItem, 'fermentation');
  }

  return formattedItem;
};

export default formatBeverageData;
