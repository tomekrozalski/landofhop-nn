import { LanguageValue } from 'utils/types';

export type Institution = {
  badge: string;
  id: string;
  name: LanguageValue[];
  shortId: string;
  website?: string;
  consortium?: LanguageValue[];
};
