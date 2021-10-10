<template>
  <the-app-layout
    title="Vota aquí"
    subtitle="Vota en tres pasos: conecta tu monedero, ingresa tu clave y selecciona la opción por la que deseas votar"
  >
    <v-stepper v-model="step" vertical color="warning">
      <v-stepper-step :complete="step > 1" step="1">
        Conecta tu monedero
        <small>En la red Rinkeby</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card class="mb-4 mb-md-6" height="200px">
          <v-container fluid fill-height class="d-flex justify-center">
            <v-btn color="primary" v-if="!state.address">
              Conecta tu monedero
            </v-btn>
            <template v-else>
              <div>
                <v-card-title class="text-center"
                  >Address: {{ state.address }}</v-card-title
                >
                <v-card-subtitle class="text-center"
                  >Network: {{ state.network }}</v-card-subtitle
                >
              </div>
            </template>
          </v-container>
        </v-card>
        <div class="d-flex align-center justify-end">
          <v-btn
            color="primary"
            @click="step++"
            class="mr-2"
            :disabled="!state.address"
          >
            <span class="d-none d-sm-inline mr-2">Siguiente</span>
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">
        Ingresa tu clave de elector
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card class="mb-4 mb-md-6" height="200px">
          <v-container fluid fill-height class="d-flex justify-center">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="clave"
                :counter="18"
                :rules="claveRules"
                label="Clave de elector"
                required
                outlined
                color="primary"
                solo
                @input="(val) => (clave = clave.toUpperCase())"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card>
        <div class="d-flex align-center justify-end">
          <v-btn
            color="primary"
            @click="step--"
            class="mr-2 dflex align-center"
          >
            <v-icon>
              mdi-chevron-left
            </v-icon>
            <span class="d-none d-sm-inline ml-2">Anterior</span>
          </v-btn>
          <v-btn
            color="primary"
            @click="preVote"
            class="mr-2"
            :disabled="!valid"
          >
            <span class="d-none d-sm-inline mr-2">Siguiente</span>
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </v-btn>
          <v-btn text @click="step = 1">
            <span class="d-none d-sm-inline">Cancelar</span>
            <v-icon class="d-inline d-sm-none">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="step > 3" step="3">
        Vota
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card class="mb-4 mb-md-6 pt-4 pb-6">
          <v-card-title
            >¿Deseas que el presidente continúe en el cargo o que
            renuncie?</v-card-title
          >
          <v-card-subtitle
            >Selecciona una de las opciones para votar</v-card-subtitle
          >
          <div
            class="d-flex flex-column flex-sm-row justify-sm-space-around my-6"
          >
            <v-btn
              color="accent"
              class="mb-6 mb-sm-0"
              v-for="order in randomOrder"
              :key="`option-${order}`"
              @click="vote(options[order].id)"
            >
              {{ options[order].description }}
            </v-btn>
          </div>
        </v-card>
        <div class="d-flex align-center justify-end">
          <v-btn
            color="primary"
            @click="step--"
            class="mr-2 dflex align-center"
          >
            <v-icon>
              mdi-chevron-left
            </v-icon>
            <span class="d-none d-sm-inline ml-2">Anterior</span>
          </v-btn>
          <v-btn text @click="step = 1">
            <span class="d-none d-sm-inline">Cancelar</span>
            <v-icon class="d-inline d-sm-none">
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </v-stepper-content>
    </v-stepper>
  </the-app-layout>
</template>

<script>
import TheAppLayout from "@/components/TheAppLayout.vue";
import { mapGetters } from "vuex";
export default {
  name: "Votar",
  data() {
    return {
      step: 1,
      valid: true,
      clave: "",
      claveRules: [
        (v) => !!v || "La clave es un campo obligatorio",
        (v) => (v && v.length === 18) || "La clave debe ser de 18 caracteres",
        (v) =>
          v.match(
            /[BCDFGHJKLMNPQRSTVWXYZ]{6}[0-9]{2}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}[0-3]{1}[0-9]{1}[HM]{1}[0-9]{3}/g
          ) !== null || "Clave inválida",
      ],
      options: [
        {
          description: "Sí, que continúe",
          id: 1,
        },
        {
          description: "No, que renuncie",
          id: 2,
        },
        {
          description: "Anular mi voto",
          id: 3,
        },
      ],
      randomOrder: [0, 1, 2],
    };
  },
  components: {
    TheAppLayout,
  },
  computed: {
    ...mapGetters({ state: "getState" }),
  },
  methods: {
    preVote() {
      // randomize voting option order
      this.randomOrder = this.shuffle(this.randomOrder);
      this.step++;
    },
    vote(id) {
      console.log(id);
    },
    shuffle([...arr]) {
      let m = arr.length;
      while (m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
      }
      return arr;
    },
  },
};
</script>
