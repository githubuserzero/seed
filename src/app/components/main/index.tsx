import RouterNavigation from 'app/components/route/RouterNavigation';
import * as React from 'react';
import { LanguageChangeButton, SignButton } from './components';
import './index.scss';

export interface Props {
  routerContents: React.ReactElement<{}>;
}

interface InternalProps {
}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'Component57762622';
  
  render() {
    return (
      <div>
        <div>
          <LanguageChangeButton/>
          <SignButton/>
        </div>
        <div>
          <RouterNavigation/>
        </div>
        <div>
          {this.props.children}
          {this.props.routerContents}
        </div>
      </div>
    );
  }
}

export default Component as React.ComponentClass<Props>;