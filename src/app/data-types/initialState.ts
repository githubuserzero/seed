import { LanguageCode } from '../config';

export interface InitialState {
  locale: LanguageCode;
  
  sample?: {
    testString: string;
  }
}