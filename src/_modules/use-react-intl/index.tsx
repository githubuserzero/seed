import React, { ComponentType, Context, createContext, useContext } from 'react';
import { InjectedIntl, injectIntl, IntlProvider as OldIntlProvider } from 'react-intl';

// @ts-ignore
const IntlContext: Context<InjectedIntl> = createContext<InjectedIntl>();

let _intl: InjectedIntl;

const InjectIntlContext: ComponentType<{}> = injectIntl(({intl, children}) => {
  _intl = intl;
  return (
    <IntlContext.Provider value={intl}>
      {children}
    </IntlContext.Provider>
  );
});

export function IntlProvider({children, ...intlProps}: OldIntlProvider.Props & {children: React.ReactNode}) {
  return (
    <OldIntlProvider {...intlProps}>
      <InjectIntlContext>
        {children}
      </InjectIntlContext>
    </OldIntlProvider>
  );
}

export function useIntl(): InjectedIntl {
  return useContext(IntlContext);
}

export function getIntl(): InjectedIntl {
  return _intl;
}