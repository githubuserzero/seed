import React from 'react';
import { InjectedIntl, IntlProvider as OldIntlProvider } from 'react-intl';
export declare function IntlProvider({ children, ...intlProps }: OldIntlProvider.Props & {
    children: React.ReactNode;
}): JSX.Element;
export declare function useIntl(): InjectedIntl;
export declare function getIntl(): InjectedIntl;
