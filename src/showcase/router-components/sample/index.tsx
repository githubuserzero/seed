import * as React from 'react';
import { Description, Source } from 'common/components/showcase';
import Sample from './Sample.sample';

export default () => (
  <div>
    <div>
      <Description html={require('./Sample.description.md')}/>
      <Sample/>
      <Source source={require('!!raw-loader!./Sample.sample')}/>
    </div>
  </div>
)