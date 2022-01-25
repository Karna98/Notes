/**
 * check-native-dep.js
 *
 * Description:
 *    Check for dependencies (npm packages) which need to be compiled based or
 *    operating system and architecture.
 *
 */

import { bold as chalkBold, whiteBright as chalkWhiteBright } from 'chalk';
import { execSync } from 'child_process';
import { existsSync as fsExistsSync, readdirSync as fsReaddirSync } from 'fs';
import { dependencies } from '../../package.json';

if (dependencies) {
  const dependenciesKeys = Object.keys(dependencies);

  const nativeDeps = fsReaddirSync('node_modules').filter((folder) =>
    fsExistsSync(`node_modules/${folder}/binding.gyp`)
  );

  if (nativeDeps.length === 0) {
    process.exit(0);
  }

  try {
    // Find the reason for why the dependency is installed. If it is installed
    // because of a devDependency then that is okay. Warn when it is installed
    // because of a dependency
    const { dependencies: dependenciesObject } = JSON.parse(
      execSync(`npm ls ${nativeDeps.join(' ')} --json`).toString()
    );

    const rootDependencies = Object.keys(dependenciesObject);

    const filteredRootDependencies = rootDependencies.filter((rootDependency) =>
      dependenciesKeys.includes(rootDependency)
    );

    if (filteredRootDependencies.length > 0) {
      const plural = filteredRootDependencies.length > 1;

      console.log(`
        ${chalkWhiteBright.bgYellow.bold(
          'Webpack does not work with native dependencies.'
        )}

        ${chalkBold(filteredRootDependencies.join(', '))}

        ${plural ? 'are native dependencies' : 'is a native dependency'}
        and should be installed inside of the "./release/app" folder.
        First, uninstall the packages from "./package.json":
        
        ${chalkWhiteBright.bgGreen.bold('npm uninstall your-package')}

        ${chalkBold(
          'Then, instead of installing the package to the root "./package.json":'
        )}

        ${chalkWhiteBright.bgRed.bold('npm install your-package')}

        ${chalkBold('Install the package to "./release/app/package.json"')}

        ${chalkWhiteBright.bgGreen.bold(
          'cd ./release/app && npm install your-package'
        )}

        Read more about native dependencies at:

        ${chalkBold(
          'https://electron-react-boilerplate.js.org/docs/adding-dependencies/#module-structure'
        )}
      `);

      process.exit(1);
    }
  } catch (e) {
    console.log('Native dependencies could not be checked');
  }
}
