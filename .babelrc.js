module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          corejs: 2,
          exclude: ['transform-typeof-symbol'],
          modules: 'commonjs',
          targets: {
            ios: 13,
            android: 9,
          },
          useBuiltIns: 'usage',
        },
        'transform-runtime': {
          corejs: 2,
        },
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: process.env.NODE_ENV !== 'production',
        pure: true,
        minify: process.env.NODE_ENV === 'production',
        transpileTemplateLiterals: process.env.NODE_ENV === 'production',
      },
    ],
    [
      'babel-plugin-transform-react-remove-prop-types',
      {
        removeImport: true,
        mode: 'remove',
      },
    ],
    'babel-plugin-transform-react-pure-class-to-function',
    [
      'babel-plugin-import',
      {
        libraryName: '@material-ui/core',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'core',
    ],
  ],
};
