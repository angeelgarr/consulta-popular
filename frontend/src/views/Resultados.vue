<template>
  <the-app-layout title="Resultados" :subtitle="`Actualizado: ${new Date()}`">
    <template v-if="!state.account">
      <v-container fluid fill-height class="d-flex justify-center">
        <v-btn
          color="primary"
          v-if="!state.account"
          @click="connectWalletAndFetchResults"
        >
          Conecta tu monedero
        </v-btn>
      </v-container>
    </template>
    <template v-else>
      <v-data-table
        :headers="headers"
        :items="state.options"
        class="elevation-1"
        disable-pagination
        disable-filtering
        hide-default-footer
      ></v-data-table>
      <v-card class="pa-2 pa-sm-4 mt-6">
        <h3 class="text-h6 my-4">
          Total de votos registrados:
          {{ totalVotes }}
        </h3>
        <div class="primary px-2 px-sm-4  py-6 py-sm-10 white--text rounded">
          <v-sparkline
            :value="chartData"
            :labels="labels"
            :gradient="['#DDC9A3', '#BC955C']"
            type="bar"
            line-width="85"
            auto-draw
            smooth="10"
          >
          </v-sparkline>
        </div>
      </v-card>
    </template>
  </the-app-layout>
</template>

<script>
import TheAppLayout from "@/components/TheAppLayout.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "Resultados",
  data() {
    return {
      labels: ["Sí", "No", "Nulos"],
      headers: [
        { text: "Opción", value: "description", sortable: false },
        { text: "Votos", value: "votes", sortable: false },
      ],
    };
  },
  components: {
    TheAppLayout,
  },
  computed: {
    ...mapGetters({ state: "getState" }),
    chartData() {
      return this.state.options.map((o) => o.votes);
    },
    totalVotes() {
      if (this.chartData.length) {
        return this.chartData.reduce(
          (previousValue, currentValue) => previousValue + currentValue
        );
      }
      return 0;
    },
  },
  methods: {
    ...mapActions(["getVotes", "connectWallet"]),
    ...mapMutations(["clearError"]),
    async connectWalletAndFetchResults() {
      await this.connectWallet();
      this.getVotes();
    },
  },
  async mounted() {
    this.clearError();
    if (this.state.account) await this.getVotes();
  },
};
</script>
