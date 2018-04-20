import IntlMessageFormat from 'intl-messageformat';
import * as Cookie from 'js-cookie';
import { addLocaleData } from 'react-intl';
import * as Recontext from 'recontext';

export type Language = 'en' | 'ko';
export const languages: Language[] = ['en', 'ko'];

addLocaleData(require('react-intl/locale-data/en'));
addLocaleData(require('react-intl/locale-data/ko'));

type Messages = {[language: string]: {[id: string]: string}};

export const messages: Messages = require('../../messages.json');

let _language: Language = Cookie.get('locale') as Language || 'en';

export module message {
  interface State {
    language: Language;
    messages: {[id: string]: string};
  }
  
  interface Actions {
    updateLanguage: (language: Language) => void;
  }
  
  export type Store = State & Actions;
  
  export const createStore: Recontext.CreateStore<State, Actions> = Recontext.createStore<State, Actions>(
    {
      language: _language,
      messages: messages[_language],
    },
    setState => ({
      updateLanguage: prevState => (language: Language) => {
        if (prevState.language !== language) {
          setState({
            language,
            messages: messages[language],
          });
          
          Cookie.set('locale', language);
        }
        
        _language = language;
      },
    }),
  );
}

export function formatMessage(messageId: string, values?: object): string {
  const format: IntlMessageFormat = new IntlMessageFormat(messages[_language][messageId], _language);
  return format.format(values);
}