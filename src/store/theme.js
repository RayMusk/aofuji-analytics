import { getLS, setLS } from '@/utils/storage.js';
import { STORAGE_THEME, DOM_ATTR_THEME } from '@/utils/constants.js';

// init dom theme attribute
const initialTheme = getLS(STORAGE_THEME) || 'auto';
document.body.setAttribute(DOM_ATTR_THEME, initialTheme);

export default {
  namespaced: true,
  state: () => ({
    theme: initialTheme,
  }),

  mutations: {
    // payload: { theme }
    xmSetTheme(state, payload) {
      const { theme } = payload;
      state.theme = theme;
      document.body.setAttribute(DOM_ATTR_THEME, theme);
      setLS(STORAGE_THEME, theme);
    },
  },

  actions: {
    async xaSwitchTheme({ state, commit }) {
      // get the current theme of app
      const curTheme = state.theme;
      // get system perfered theme
      const sysTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      // calculate the new theme
      let newTheme;
      if (curTheme === 'auto') {
        // if in auto mode, switch to custom mode
        newTheme = sysTheme === 'light' ? 'dark' : 'light';
      } else {
        // if in custom mode
        newTheme = curTheme === 'light' ? 'dark' : 'light';
        if (newTheme === sysTheme) {
          // if target theme is the system perfered theme, back to auto
          newTheme = 'auto';
        }
      }
      // commit theme change
      commit('xmSetTheme', { theme: newTheme });
    },
  },
};
