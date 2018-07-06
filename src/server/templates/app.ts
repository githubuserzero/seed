import { TemplateParams } from './types';

export default ({body, initialState}: TemplateParams) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset=UTF-8>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/"/>
    <link rel="stylesheet" type="text/css" href="style.css"/>
    <title>Title...</title>
    ${ typeof initialState === 'string' ? `<script>window.__INITIAL_STATE__=${initialState.replace(/</g, '\\u003c')}</script>` : '' }
  </head>
  
  <body>
    <div id="app">${body}</div>
  </body>
  
  <script src="vendor.js"></script>
  <script src="init.js"></script>
  <script src="app.js"></script>
</html>
`