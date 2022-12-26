const shell = require('shelljs');

shell.exec('graphql-codegen --config codegen.yml');
shell.exec('rm -rf types');
shell.exec('tsc -p ./tsconfig.json');
shell.exec('yarn lint --fix');
