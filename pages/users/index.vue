<template>
  <div>
    <h1 class="mt-4">Liste des utilisateurs</h1>
    <b-table
      striped
      hover
      :items="users"
      :fields="fields"
      :tbody-tr-class="rowClass"
    ></b-table>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  auth: "guest",
  head() {
    return {
      title: "Utilisateurs — Wallet",
    };
  },

  data: () => ({
    fields: [
      {
        key: "lastname",
        sortable: true,
        label: "Prénom(s)",
      },
      {
        key: "firstname",
        sortable: false,
        label: "Nom(s)",
      },
      {
        key: "email",
        label: "Adresse mail",
        sortable: true,
      },
      {
        key: "role",
        label: "Rôle",
        sortable: true,
      },
    ],
    users: [],
  }),
  methods: {
    rowClass(item) {
      if (!item || !item.status) return "table-danger";
      if (item.status) return;
    },
  },
  async fetch() {
    const response = await this.$axios.$get(
      "http://localhost:8000/api/v1/users"
    );

    this.users = response.data;
  },
};
</script>
