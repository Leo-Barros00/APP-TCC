module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module-resolver", {
        "alias": {
          "@Components": "./src/components",
          "@Screens": "./src/screens",
          "@Hooks": "./src/hooks",
          "@Store": "./src/store",
          "@Utils": "./src/utils",
          "@Api": "./src/api",
          "@Typings": "./src/typings",
        }
      }],
    ]
  };
};
