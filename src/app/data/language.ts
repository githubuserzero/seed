import { addLocaleData } from "react-intl";

export type Language = 'en' | 'ko';
export const languages: Language[] = ['en', 'ko'];

addLocaleData(require('react-intl/locale-data/en'));
addLocaleData(require('react-intl/locale-data/ko'));