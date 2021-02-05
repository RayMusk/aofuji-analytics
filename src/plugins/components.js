import { camelCase, upperFirst } from 'lodash';

/**
 * @param {string} fileName
 */
function getComponentName(fileName) {
  return upperFirst(
    camelCase(
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );
}

export default {
  /**
   * install global components
   * @param {Vue} Vue
   */
  install(Vue) {
    /* icons */
    const requireIcons = require.context('../assets/icons', false, /.*\.svg$/);
    requireIcons.keys().forEach((fileName) => {
      const componentConfig = requireIcons(fileName);
      const componentName = `VIcon${getComponentName(fileName)}`;
      Vue.component(componentName, componentConfig.default || componentConfig);
    });

    /* components */
    const requireBasic = require.context('../components/basic', false, /.*\.vue$/);
    requireBasic.keys().forEach((fileName) => {
      const componentConfig = requireBasic(fileName);
      const componentName = getComponentName(fileName);
      Vue.component(componentName, componentConfig.default || componentConfig);
    });

    const requireDerived = require.context('../components/derived', false, /.*\.vue$/);
    requireDerived.keys().forEach((fileName) => {
      const componentConfig = requireDerived(fileName);
      const componentName = getComponentName(fileName);
      Vue.component(componentName, componentConfig.default || componentConfig);
    });
  },
};
