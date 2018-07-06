import { ContextState } from 'app/context';
import { Language } from 'seed/data';

export default (language: Language) => ({updateLanguage}: ContextState) => {
  updateLanguage(language);
}