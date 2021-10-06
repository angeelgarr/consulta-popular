<template>
  <v-container fluid class="mt-16">
    <h2 class="text-h4 my-6">{{ title }}</h2>
    <p class="text-subtitle-2 mb-6">{{ subtitle }}</p>
    <slot> </slot>
  </v-container>
</template>

<script>
export default {
  name: "TheAppLayout",
  props: {
    title: {
      type: String,
      required: false,
      default: () => {
        "";
      },
    },
    subtitle: {
      type: String,
      required: false,
      default: () => {
        "";
      },
    },
  },
};
</script>
