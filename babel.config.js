module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }]
  ];
  const plugins = ['@babel/plugin-transform-react-jsx'];

  return {
    presets,
    plugins,
  };
};
