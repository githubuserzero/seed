import { changeLanguage } from 'common/actions';
import { IntlStore, Language, languages } from 'common/data';
import { Dispatch, dispatcher } from 'mobx-dispatcher';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import * as styles from './LanguageChangeButton.module.scss';

export interface Props {
}

interface InternalProps {
  intl: IntlStore;
  dispatch: Dispatch;
}

interface State {
}

@inject('intl') @dispatcher @observer
class Component extends React.Component<Props & InternalProps, State> {
  static displayName: string = 'LanguageChangeButton';
  
  render() {
    return (
      <div className={styles.main}>
        {this.props.intl.language} :
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

export default Component as React.ComponentClass<Props>;