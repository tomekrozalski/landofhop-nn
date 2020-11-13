// import { LanguageValue } from 'utils/types';
// import { Beverage } from 'beverage/utils/types';
// import {
//   beverageDetailsNormalizer,
//   languageIdToCode,
// } from 'beverage/utils/helpers';
// import { NormalizedBeverage } from './NormalizedBeverage.type';

// /* ---------------------------------------------------
//  * REGULAR BEVERAGE NORMALIZATION
//  *
//  * I use it in Gatsby to prefetch all beverages.
//  * So language-value arrays are not translated, but
//  * language id is replaced by language code
//  */

// const normalize = (beverage: Beverage): NormalizedBeverage => {
//   const transformLanguage = ({ values }: { values: LanguageValue[] }) =>
//     languageIdToCode({
//       languages: beverage.language,
//       values,
//     });

//   const translate = ({ values }: { values: LanguageValue[] }) =>
//     transformLanguage({ values });

//   return beverageDetailsNormalizer({ beverage, transformLanguage, translate });
// };

// export default normalize;
