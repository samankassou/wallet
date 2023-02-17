<template>
  <div>
    <h1 class="mt-4">Catégories d'opérations</h1>
    <b-row class="mb-4">
      <b-col>
        <b-btn variant="outline-primary" to="/categories/create">
          Enregistrer une catégorie
        </b-btn>
      </b-col>
    </b-row>
    <b-table striped hover :items="categories" :fields="fields"></b-table>
  </div>
</template>
<script>
export default {
  middleware: "auth",
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
    const response = await this.$axios.$get("/api/categories");

    this.categories = response.data;
  },
};
</script>
