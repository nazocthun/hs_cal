import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        navbar: "#252a34",
        primary: "#ff4e7b", 
        panel: "#b5bbc4",
        text: colors.indigo.lighten5, 
        background: "#f8f9fa",
        icon: "#252a34",
      },
      dark: {
        navbar: "#222831",
        primary: "#00adb5", 
        panel: "#252a34",
        text: "#eeeeee", 
        background: "#393e46", 
        icon: "#eeeeee",
      },
    },
    dark: localStorage.getItem('theme') === 'dark',
  },
});
