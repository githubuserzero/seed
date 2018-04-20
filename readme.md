# Run project by web

1. `npm run web.dll.build` create webpack dll file (for boost webpack test build speed)
2. `npm start`
  - Or if you don't have Iterm2 on your computer. you need 3 terminal windows.
    1. `npm run web.server.dev.build.watch`
    2. `npm run web.dev.start`
    3. `npm run web.server.dev.start`

# Run project by electron

1. `npm run start-electron`
  - Or if you don't have Iterm2 on your computer. you need 2 terminal windows.
    1. `npm run electron.dev.build.watch`
    2. `npm run electron.dev.start`

# Build and publish project

1. `npm run build` or `npm run web.build && npm run web.server.build`
2. `npm run git.publish`
  - Files will push to  branches `subtree/web` and `subtree/server`.

# Build and publish libraries

1. `npm run build` or `npm run libs.build`
2. `npm run libs.publish`