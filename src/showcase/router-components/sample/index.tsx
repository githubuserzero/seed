import React from 'react';
import { CodeBlock, Markdown } from 'react-devdoc';
import { Sample } from './Sample';

export default function () {
  return (
    <div>
      <div>
        <Markdown text={require('./Sample.description.md')}/>
        <Sample/>
        <CodeBlock value={require('!!raw-loader!./Sample')} language="typescript jsx"/>
      </div>
    </div>
  );
}