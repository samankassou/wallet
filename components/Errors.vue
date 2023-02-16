<template>
  <div v-if="errors.length">
    <div class="text-center">
      <b-alert show variant="danger" v-for="(error, i) in errors" :key="i">
        {{ error }}
      </b-alert>
    </div>
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
