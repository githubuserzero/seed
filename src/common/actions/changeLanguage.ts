import { Language } from 'common/data';
import { message } from '../data';

export default (language: Language) => ({message}: {message: message.Store}) => {
  message.updateLanguage(language);
}