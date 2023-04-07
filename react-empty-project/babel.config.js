module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '@': ['./src'],
          '@app': ['./src/app'],
          // example
          // '@components': ['./src/components'],
        },
      },
    ],
  ],
};
