<template>
  <div>
    <h1 class="mt-4">Liste des utilisateurs</h1>
    <b-table
      striped
      hover
      :items="users"
      :fields="fields"
      :busy.sync="$fetchState.pending"
      :tbody-tr-class="rowClass"
      :actions="actions"
    >
    </b-table>
    <b-col sm="7" md="6" class="my-1">
      <b-pagination
        v-model="currentPage"
        :total-rows="10"
        :per-page="5"
        align="fill"
        size="sm"
        class="my-0"
      ></b-pagination>
    </b-col>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  head() {
    return {
      title: "Utilisateurs — Wallet",
    };
  },

  data: () => ({
    actions: [
      {
        btn_text: "Download",
        event_name: "on-download",
        class: "btn btn-primary my-custom-class",
        event_payload: {
          msg: "my custom msg",
        },
      },
    ],
    currentPage: 1,
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
    editItem(item, index, target) {
      console.log(item);
    },
  },
  async fetch() {
    const response = await this.$axios.$get("/api/users");

    this.users = response.data;
  },
};
</script>
