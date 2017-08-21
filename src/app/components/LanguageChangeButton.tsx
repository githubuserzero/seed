import { changeLanguage } from 'actions';
import * as React from 'react';
import styled from 'styled-components';
import { dispatcher, Dispatch } from 'mobx-dispatcher';

interface Props {
  className: string;
  dispatch: Dispatch;
}

const Component: React.ComponentClass<{}> = styled(dispatcher(({className, dispatch}: Props) => (
  <div className={className}>
    <button onClick={() => changeLanguage('en')}>en</button>
    <button onClick={() => changeLanguage('ko')}>ko</button>
  </div>
)))`// styled
  display: inline-block;
`;

export default Component;