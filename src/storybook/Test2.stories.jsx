import { storiesOf } from '@storybook/react';
import React from 'react';

function Test({text}) {
  return <div>{text}</div>;
}

storiesOf('Test2', module)
  .add('Hello?', () => (
    <Test text="Hello?"/>
  ))
  .add('World?', () => (
    <Test text="World?"/>
  ));