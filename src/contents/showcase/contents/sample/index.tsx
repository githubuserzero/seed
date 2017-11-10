import { Description, Source } from 'app/components';
import * as React from 'react';
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