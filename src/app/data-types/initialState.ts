import { LanguageCode } from './locale';

export interface InitialState {
  locale: LanguageCode;
  
  sample?: {
    testString: string;
  }
}