import { ContextState, withConsumer } from 'app/context';
import { changeLanguage } from 'common/actions';
import { Language, languages } from 'common/data';
import * as React from 'react';
import * as styles from './LanguageChangeButton.module.scss';

export interface Props {
}

interface InternalProps extends ContextState {
}

interface State {
}

class Component extends React.PureComponent<Props & InternalProps, State> {
  static displayName: string = 'LanguageChangeButton';
  
  render() {
    return (
      <div className={styles.main}>
        {this.props.message.language} :
        {
          languages.map(language => (
            <button key={language} onClick={() => this.change(language)}>
              {language}
            </button>
          ))
        }
      </div>
    );
  }
  
  change = (language: Language) => {
    this.props.dispatch(changeLanguage(language));
  };
}

export default withConsumer<Props & InternalProps>(Component) as React.ComponentClass<Props>;