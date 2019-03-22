import { useAppContextState } from 'app/context';
import React from 'react';
import { useIntl } from 'use-react-intl';

export default function Sample() {
  const {locale} = useAppContextState();
  const {formatMessage} = useIntl();
  
  return (
    <div>
      {formatMessage({id: 'sample.text'}, {locale})}
    </div>
  );
}