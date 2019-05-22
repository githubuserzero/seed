import { storiesOf } from '@storybook/react';
import React from 'react';

function Test({text}: {text: string}) {
  return <div>{text}</div>;
}

storiesOf('Test1', module)
  .add('Hello?', () => (
    <Test text="Hello?"/>
  ))
  .add('World?', () => (
    <Test text="World?"/>
  ));