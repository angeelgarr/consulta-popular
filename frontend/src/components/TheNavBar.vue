<template>
  <nav>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        color="secondary"
        @click="toggleDrawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" class="d-flex align-center">
          <v-icon large left color="secondary">mdi-vote-outline</v-icon>
          <span
            class="secondary--text text-h5 text-md-h4 text-xl-h3 font-weight-medium"
          >
            Consulta Popular
          </span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn fab small color="accent">
        <v-icon>mdi-wallet</v-icon>
      </v-btn> -->
    </v-app-bar>

    <v-navigation-drawer v-model="showDrawer" app color="primary">
      <v-container fluid class="d-flex justify-end">
        <v-btn fab small color="accent" @click="toggleDrawer">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-container>

      <v-list v-for="item in items" :key="item.text" nav>
        <v-list-item class="d-flex align-center" router :to="item.route">
          <v-list-item-icon>
            <v-icon v-text="item.icon" color="secondary"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="white--text"
              v-text="item.text"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "TheNavBar",
  data() {
    return {
      showDrawer: false,
      items: [
        { text: "Votar", icon: "mdi-vote", route: "/" },
        { text: "Resultados", icon: "mdi-vote", route: "/resultados" },
        { text: "Acerca de", icon: "mdi-vote", route: "/acerca-de" },
      ],
    };
  },
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
  },
};
</script>
