import RouterNavigation from 'app/components/route/RouterNavigation';
import * as React from 'react';
import { LanguageChangeButton, TimezoneChangeSelect } from 'seed/components';
import { SignButton } from 'app/components/user';
import './index.scss';

export interface Props {
  routerContents: React.ReactElement<{}>;
}

interface InternalProps {
}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'app.components.main';
  
  render() {
    return (
      <React.Fragment>
        <div>
          <LanguageChangeButton/>
          <SignButton/>
          <TimezoneChangeSelect/>
        </div>
        <div>
          <RouterNavigation/>
        </div>
        <div>
          {this.props.children}
          {this.props.routerContents}
        </div>
      </React.Fragment>
    );
  }
}

export default Component as React.ComponentClass<Props>;