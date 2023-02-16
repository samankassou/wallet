<template>
  <div>
    <h1 class="mt-4">Catégories d'opérations</h1>
    <b-table striped hover :items="categories" :fields="fields"></b-table>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  auth: "guest",
  head() {
    return {
      title: "Catégories — Wallet",
    };
  },
  data: () => ({
    fields: [
      {
        key: "title",
        sortable: true,
        label: "Libellé",
      },
      {
        key: "slug",
        sortable: false,
        label: "Slug",
      },
    ],
    categories: [],
  }),
  async fetch() {
    const response = await this.$axios.$get("/api/v1/categories");

    this.categories = response.data;
  },
};
</script>
