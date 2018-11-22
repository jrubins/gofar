module.exports = {
  plugins: ['lodash', 'react-hot-loader/babel'],
  presets: [
    '@babel/react',
    [
      '@babel/env',
      {
        modules: false,
        targets: '> 1%',
        useBuiltIns: 'usage',
      },
    ],
  ],
}
