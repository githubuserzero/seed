import { TemplateParams } from './types';

export default ({body, initialState, styleTags}: TemplateParams) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset=UTF-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/"/>
    <link rel="stylesheet" type="text/css" href="app.css?1"/>
    <title>Title...</title>
    ${ typeof initialState === 'string' ? `<script>window.__INITIAL_STATE__=${initialState}</script>` : '' }
    ${ typeof styleTags === 'string' ? styleTags : '' }
  </head>
  
  <body>
    <div id="app">${body}</div>
  </body>
  
  <script src="dll.js"></script>
  <script src="shared.js"></script>
  <script src="init.js"></script>
  <script src="app.js"></script>
</html>
`