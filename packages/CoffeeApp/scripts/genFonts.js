const fs = require('fs');

const fonts = () => {
  const array = fs.readdirSync('src/assets/fonts');

  return Array.from(new Set(array));
};

const generate = () => {
  let properties = fonts()
    .map((name) => {
      const replaceName = name.charAt(0).toLowerCase() + name.substring(1).replace('.ttf', '');
      const _name = name.charAt(0).toUpperCase() + name.substring(1).replace('.ttf', '');
      return `${replaceName.replace(/([-_]\w)/g, (g) => g[1].toUpperCase())}: '${_name}'`;
    })
    .join(',\n');

  const string = `export const fonts = {
  ${properties}
}
`;

  fs.writeFileSync('src/assets/fonts/index.ts', string, 'utf8');
};

generate();
