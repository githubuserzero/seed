import messages from 'generated/locales.json';
import React, { useContext } from 'react';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import { IntlProvider } from 'use-react-intl';
import { useInitialState } from './context-states/useInitialState';
import { useLocale } from './context-states/useLocale';
import { useTimezone } from './context-states/useTimezone';
import { InitialState } from './data-types/initialState';
import { LanguageCode } from './data-types/locale';
import { Timezone } from './data-types/timezone';

addLocaleData(en);
addLocaleData(ko);

export interface AppContextProps {
  initialState: InitialState | null;
  currentTimezone: string;
  currentLocale: LanguageCode;
  children: React.ReactNode;
}

export interface AppContextState {
  initialState: InitialState | null;
  locale: LanguageCode;
  timezone: Timezone;
  
  updateLocale: (languageCode: LanguageCode) => void;
  updateTimezone: (timezone: string | Timezone) => void;
}

// @ts-ignore
const AppContext: React.Context<AppContextState> = React.createContext<AppContextState>();

export function AppContextProvider({initialState: defaultInitialState, children, currentLocale, currentTimezone}: AppContextProps) {
  const {locale, updateLocale} = useLocale(currentLocale);
  const {timezone, updateTimezone} = useTimezone(currentTimezone);
  const {initialState} = useInitialState(defaultInitialState);
  
  return (
    <IntlProvider locale={locale.slice(0, 2)} messages={messages[locale]}>
      <AppContext.Provider value={{
        initialState,
        locale,
        timezone,
        updateLocale,
        updateTimezone,
      }}>
        {children}
      </AppContext.Provider>
    </IntlProvider>
  );
}

export function useAppContextState(): AppContextState {
  return useContext(AppContext);
}