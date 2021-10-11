<template>
  <v-app>
    <the-nav-bar />
    <v-alert type="error" class="mt-12 mb-4" v-if="state.error.message">
      <h6 class="overline">{{ state.error.name }}</h6>
      <p class="">{{ state.error.message }}</p>
    </v-alert>
    <v-container>
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import TheNavBar from "./components/TheNavBar.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "ConsultaPopular",
  components: {
    TheNavBar,
  },
  computed: {
    ...mapGetters({ state: "getState" }),
  },
  methods: {
    ...mapActions(["checkWeb3Availability", "connectContract"]),
  },
  mounted() {},
  async created() {
    document.title = "Consulta Popular";
    this.checkWeb3Availability();
    await this.connectContract();
  },
};
</script>
