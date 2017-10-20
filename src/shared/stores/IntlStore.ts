import { Language } from 'frame';
import * as Cookie from 'js-cookie';
import { action, computed, observable } from 'mobx';
import { addLocaleData } from 'react-intl';

addLocaleData(require('react-intl/locale-data/en'));
addLocaleData(require('react-intl/locale-data/ko'));

type Messages = {[language: string]: {[id: string]: string}};

export default class IntlStore {
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