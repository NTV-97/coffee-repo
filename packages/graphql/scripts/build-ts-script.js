const shell = require('shelljs');

shell.exec('rm -rf types');
shell.exec('tsc -p ./tsconfig.json');
shell.exec('yarn lint --fix');
