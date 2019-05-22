import { configure } from '@storybook/react';

function loadStories() {
  const req = require.context('../src', true, /\.stories\.(js|jsx|ts|tsx)$/);
  req.keys().forEach(req);
}

configure(loadStories, module);