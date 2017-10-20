import * as React from 'react';
import { LanguageChangeButton, SignButton, RouterNavigation } from './components';
import * as styles from './index.scss';

export interface Props {
  routerContents: React.ReactElement<{}>;
}

interface InternalProps {
}

interface State {
}

class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <div className={styles.cls}>
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