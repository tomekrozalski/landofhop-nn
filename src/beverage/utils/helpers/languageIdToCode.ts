import * as mongoose from 'mongoose';

import { LanguageValue } from 'utils/types';
import { Code } from 'language/utils/types';
import { Tale } from 'beverage/utils/types/fragments';

type Values = LanguageValue | Tale;
type Props = {
  values: Values[];
  languageList: Code[];
};

const languageIdToCode = ({ languageList, values }: Props) =>
  values.map(({ language, ...rest }: any) => {
    const code = languageList.find(
      ({ id }) =>
        mongoose.Types.ObjectId(id).toString() ===
        mongoose.Types.ObjectId(language).toString(),
    )?.code;

    return {
      ...(language && { language: code }),
      ...rest,
    };
  });

export default languageIdToCode;
