const shell = require('shelljs');

const { exec } = shell;

function run() {
  exec(
    'xcodebuild -UseModernBuildSystem=NO -workspace ios/CoffeeApp.xcworkspace -scheme CoffeeApp -configuration Release archive -archivePath ios/Coffee.xcarchive',
  );
}

run();
