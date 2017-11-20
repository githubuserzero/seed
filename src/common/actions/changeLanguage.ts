import { CommonProps, Language } from 'common';

export default (language: Language) => ({intl}: CommonProps) => {
  intl.updateLanguage(language);
}