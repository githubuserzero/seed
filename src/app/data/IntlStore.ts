import * as Cookie from 'js-cookie';
import { action, computed, observable } from 'mobx';
import { addLocaleData } from 'react-intl';
import { Language } from '../';

addLocaleData(require('react-intl/locale-data/en'));
addLocaleData(require('react-intl/locale-data/ko'));

type Messages = {[language: string]: {[id: string]: string}};

interface IntlStore {
  readonly language: string;
  readonly messages: {[id: string]: string};
  
  updateLanguage: (language: Language) => void;
}

class IntlStoreImpl implements IntlStore {
  @observable
  language: string = Cookie.get('locale') || 'en';
  
  @observable
  private _messages: Messages = {
    en: require('messages/en.json'),
    ko: require('messages/ko.json'),
  };
  
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
}

const intlStore: IntlStore = new IntlStoreImpl;

export {
  intlStore,
  IntlStore,
};