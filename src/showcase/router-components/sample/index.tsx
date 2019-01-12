import React from 'react';
import { Description } from 'showcase/components/Description';
import { Source } from 'showcase/components/Source';
import { Sample } from './Sample';

// tslint:disable:no-default-export
export default function () {
  return (
    <div>
      <div>
        <Description html={require('./Sample.description.md')}/>
        <Sample/>
        <Source source={require('!!raw-loader!./Sample')}/>
      </div>
    </div>
  );
}