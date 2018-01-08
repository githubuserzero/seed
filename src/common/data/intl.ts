import * as Cookie from 'js-cookie';
import { action, computed, observable } from 'mobx';
import { addLocaleData } from 'react-intl';
import IntlMessageFormat from 'intl-messageformat';

export type Language = 'en' | 'ko';
export const languages: Language[] = ['en', 'ko'];

addLocaleData(require('react-intl/locale-data/en'));
addLocaleData(require('react-intl/locale-data/ko'));

type Messages = {[language: string]: {[id: string]: string}};

interface IntlStore {
  readonly language: string;
  readonly messages: {[id: string]: string};
  
  updateLanguage: (language: Language) => void;
  formatMessage: (message: string, values?: object) => string;
}

class IntlStoreImpl implements IntlStore {
  @observable
  language: string = Cookie.get('locale') || 'en';
  
  @observable
  private _messages: Messages = require('../../messages.json');
  
  @action
  updateLanguage = (language: Language) => {
    if (this.language !== language) {
      this.language = language;
      Cookie.set('locale', language);
    }
  };
  
  @computed
  get messages(): {[id: string]: string} {
    return this._messages[this.language];
  }
  
  formatMessage = (messageId: string, values?: object) => {
    const format: IntlMessageFormat = new IntlMessageFormat(this.messages[messageId], this.language);
    return format.format(values);
  };
}

const intlStore: IntlStore = new IntlStoreImpl;

export {
  intlStore,
  IntlStore,
};