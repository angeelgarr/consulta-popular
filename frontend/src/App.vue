<template>
  <v-app>
    <the-nav-bar />
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import TheNavBar from "./components/TheNavBar.vue";

export default {
  name: "ConsultaPopular",
  components: {
    TheNavBar,
  },
};
</script>
