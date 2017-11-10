import { GlobalInjectedProps, Language } from 'app';

export default (language: Language) => ({intl}: GlobalInjectedProps) => {
  intl.updateLanguage(language);
}