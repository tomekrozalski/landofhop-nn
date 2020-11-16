import * as mongoose from 'mongoose';

import { LanguageValue } from 'utils/types';
import { Tale } from 'beverage/utils/types/fragments';
import { Language } from 'beverage/utils/types/fragments';

type Values = LanguageValue | Tale;
type Props = {
  values: Values[];
  languages: Language[];
};

const languageIdToCode = ({ languages, values }: Props) =>
  values.map(({ language, ...rest }: any) => {
    const code = languages.find(
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
