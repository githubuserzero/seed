import { useAppContextState } from 'app/context';
import React, { useContext } from 'react';
//@ts-ignore
import { IntlContext } from 'react-intl';

export default function TranslationSample() {
  const {locale} = useAppContextState();
  const {formatMessage} = useContext(IntlContext);
  
  return (
    <div>
      {formatMessage({id: 'sample.text'}, {locale})}
    </div>
  );
}