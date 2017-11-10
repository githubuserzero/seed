import { Language, languages } from 'app';
import { changeLanguage } from 'app/actions';
import { IntlStore } from 'app/data';
import { Dispatch, dispatcher } from 'mobx-dispatcher';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

export interface Props {
}

interface InternalProps {
  className: string;
  intl: IntlStore;
  dispatch: Dispatch;
}

interface State {
}

@inject('intl') @dispatcher @observer
class Component extends React.Component<Props & InternalProps, State> {
  render() {
    return (
      <div className={this.props.className}>
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

export default styled(Component)`
  display: inline-block;
` as React.ComponentClass<Props>;