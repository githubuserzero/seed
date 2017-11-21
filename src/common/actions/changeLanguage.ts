import { CommonProps } from 'common';
import { Language } from 'common/data';

export default (language: Language) => ({intl}: CommonProps) => {
  intl.updateLanguage(language);
}