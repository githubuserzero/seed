import { Language } from 'seed/data';
import { User } from './user';

export interface InitialState {
  language: Language,
  user: User | null,
  
  sample?: {
    testString: string;
  }
}