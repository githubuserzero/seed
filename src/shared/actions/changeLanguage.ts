import { GlobalInjectedProps, Language } from 'frame';

export default (language: Language) => ({intl}: GlobalInjectedProps) => {
  intl.updateLanguage(language);
}