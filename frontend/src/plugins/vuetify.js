import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: "#10312B", // VERDE OSCURO
        secondary: "#FFFFFF", // BLANCO
        accent: "#691C32", // DORADO
        error: "#9F2241", // ROJO
        info: "#6F7271", // GRIS OSCURO
        success: "#235B4E", // VERDE
        warning: "#BC955C", // DORADO OSCURO
      },
    },
  },
});
// ROJO OSCURO 691C32
// ROJO 9F2241
// VERDE OSCURO 10312B
// VERDE 235B4E
// DORADO OSCURO BC955C
// DORADO DDC9A3
// GRIS OSCURO 6F7271
// GRIS 98989A
// BLANCO FFFFFF
