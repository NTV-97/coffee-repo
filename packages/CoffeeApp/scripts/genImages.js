const fs = require('fs');

const imageFileNames = () => {
  const array = fs
    .readdirSync('src/assets/images')
    .filter((file) => {
      if (file.endsWith('.png')) {
        return file.endsWith('.png');
      } else if (file.endsWith('.jpg')) {
        return file.endsWith('.jpg');
      }
    })
    .map((file) => {
      if (file.endsWith('.png')) {
        return file.replace('@2x.png', '.png').replace('@3x.png', '.png');
      } else if (file.endsWith('.jpg')) {
        return file.replace('@2x.jpg', '.jpg').replace('@3x.jpg', '.jpg');
      }
    });

  return Array.from(new Set(array));
};

const generate = () => {
  let properties = imageFileNames()
    .map((name) => {
      let replaceName;
      if (name.endsWith('.png')) {
        replaceName = name.charAt(0).toLowerCase() + name.substring(1).replace('.png', '');
        return `${replaceName.replace(/([-_]\w)/g, (g) =>
          g[1].toUpperCase(),
        )}: require('./${name}'),`;
      } else if (name.endsWith('.jpg')) {
        replaceName = name.charAt(0).toLowerCase() + name.substring(1).replace('.jpg', '');
        return `${replaceName.replace(/([-_]\w)/g, (g) =>
          g[1].toUpperCase(),
        )}: require('./${name}'),`;
      }
    })
    .join(',\n');

  const string = `export const images = {
  ${properties}
};
`;

  fs.writeFileSync('src/assets/images/index.ts', string, 'utf8');
};

generate();
