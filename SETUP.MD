## Pre-requisites

- Install **Node** for respective platform from https://nodejs.org/en/

- **Windows**

  - Git Bash

- **MacOS**

  _To be updated. (Device Constraints)_

- **Linux**

  _To be updated._

## Steps

1.  Install all **npm** dependencies by running following command

        npm install

    Installing and compiling native node modules

        npm run native-dep

2.  Start Notes Application.

    - For PRODUCTION Mode

      - Bundling and building code

            npm run build

        Output files are generated in **_release/app/dist_**

      - Running Notes app

            npm start

    - For DEVELOPMENT Mode
    
          npm start dev

### Linting code

    npm run lint

### Formatting code

    npm run format
