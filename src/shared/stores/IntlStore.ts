import { Language } from 'frame';
import * as Cookie from 'js-cookie';
import { action, computed, observable } from 'mobx';
import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as ko from 'react-intl/locale-data/ko';

addLocaleData(en);
addLocaleData(ko);

type Messages = {[id: string]: string};

export default class IntlStore {
  @observable
  language: string = Cookie.get('locale') || 'en';
  
  @observable
  private _messages: {[language: string]: Messages} = window['__MESSAGE_STORE__'] || {};
  
  constructor() {
    window.addEventListener('__MESSAGE_STORE_UPDATED__', () => {
      this._messages = window['__MESSAGE_STORE__'];
      //console.log('[IntlStore] Messages updated.\n' + JSON.stringify(window['__MESSAGE_STORE__'], null, 2));
    });
  }
  
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