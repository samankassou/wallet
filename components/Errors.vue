<template>
  <div v-if="errors.length">
    <h2>Whoops! une erreur s'est produite.</h2>

    <ul>
      <b-alert show variant="danger" v-for="(error, i) in errors" :key="i">{{
        error
      }}</b-alert>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
