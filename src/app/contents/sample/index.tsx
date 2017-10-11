import '!!message-loader!./messages/en.json?language=en';
import '!!message-loader!./messages/ko.json?language=ko';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

export interface Props {

}

interface InternalProps extends InjectedIntlProps {

}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <div>
        <FormattedMessage id="sample.text"/>
      </div>
    );
  }
}

export default injectIntl<Props>(Component) as React.ComponentClass<Props>;