import _ from "lodash";

// Mostly from Tailwind CSS
// cf. https://github.com/tailwindcss/tailwindcss/blob/master/__tests__/util/invokePlugin.js
module.exports = function(plugin, config) {
  const addedUtilities = [];

  const getConfigValue = (path, defaultValue) => {
    const value = _.get(config, path, defaultValue);
    return value;
  };
  const pluginApi = {
    config: getConfigValue,
    e: className => className,
    theme: (path, defaultValue) =>
      getConfigValue(`theme.${path}`, defaultValue),
    variants: (path, defaultValue) => {
      if (_.isArray(config.variants)) {
        return config.variants;
      }

      return getConfigValue(`variants.${path}`, defaultValue);
    },
    target: path => {
      if (_.isString(config.target)) {
        return config.target;
      }

      const [defaultTarget, targetOverrides] = getConfigValue("target");

      return _.get(targetOverrides, path, defaultTarget);
    },
    addUtilities(utilities, variants) {
      addedUtilities.push([utilities, variants]);
    }
  };

  plugin(pluginApi);

  return {
    utilities: addedUtilities.map(([utilities, variants]) => [
      _.merge({}, ..._.castArray(utilities)),
      variants
    ])
  };
};
