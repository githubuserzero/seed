import { changeLanguage } from 'actions';
import { i18n, languages } from 'frame';
import { Dispatch, dispatcher } from 'mobx-dispatcher';
import * as React from 'react';
import styled from 'styled-components';

interface Props {
  className: string;
  dispatch: Dispatch;
}

interface State {
  language?: string;
}

const Component: React.ComponentClass<{}> = styled(dispatcher(class extends React.Component<Props, State> {
  state: State = {
    language: i18n.language,
  };
  
  render() {
    return (
      <div className={this.props.className}>
        {this.state.language} :
        {
          languages.map(lng => (
            <button onClick={() => changeLanguage(lng)}>
              {lng}
            </button>
          ))
        }
      </div>
    );
  }
  
  componentWillMount() {
    i18n.on('initialized', this.languageInitialized);
    i18n.on('languageChanged', this.languageChanged);
  }
  
  componentWillUnmount() {
    i18n.off('languageChanged', this.languageChanged);
  }
  
  languageInitialized = () => {
    i18n.off('initialized', this.languageInitialized);
    this.setState({language: i18n.language || 'en'});
  };
  
  languageChanged = (language: string) => {
    this.setState({language});
  };
}))`// styled
  display: inline-block;
`;

export default Component;