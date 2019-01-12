import { useAppContextState } from 'app/context';
import React from 'react';
import { useIntl } from 'use-react-intl';

export function PortalSample() {
  const {locale} = useAppContextState();
  const {formatMessage} = useIntl();
  
  return (
    <div>
      {locale}: {formatMessage({id: 'app.sample.text2'})}
    </div>
  );
}