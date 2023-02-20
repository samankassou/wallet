<template>
  <div>
    <h1 class="mt-4">Liste des utilisateurs</h1>
    <b-table
      hover
      :items="users"
      :fields="fields"
      :busy.sync="$fetchState.pending"
      :tbody-tr-class="rowClass"
      :actions="actions"
    >
      <!-- A virtual column -->
      <template #cell(#)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(Statut)="row">
        <b-button
          :variant="row.item.status ? 'danger' : 'success'"
          size="sm"
          class="mr-2"
          @click="toggleStatus(row.item.id)"
          >{{ row.item.status ? "Désactiver" : "Activer" }}
        </b-button>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Chargement...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination
      :value="pagination.current_page"
      :total-rows="pagination.total"
      :per-page="pagination?.per_page"
      @change="handlePageChange"
    ></b-pagination>
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
    pagination: {
      current_page: 1,
    },
    fields: [
      "#",
      {
        key: "lastname",
        sortable: true,
        label: "Prénom(s)",
      },
      {
        key: "firstname",
        sortable: true,
        label: "Nom(s)",
      },
      {
        key: "email",
        label: "Adresse mail",
        sortable: true,
      },
      "Statut",
      {
        key: "role",
        label: "Rôle",
      },
    ],
    users: [],
  }),
  methods: {
    makeToast() {
      this.$bvToast.toast(`Mis à jour avec succès`, {
        title: "Wallet",
        autoHideDelay: 5000,
        variant: "success",
      });
    },
    rowClass(item) {
      if (!item || !item.status) return "table-danger";
      if (item.status) return;
    },
    editItem(item, index, target) {
      console.log(item);
    },
    toggleStatus(id) {
      this.$axios
        .$patch(`/api/users/toggle-status/${id}`)
        .then((res) => {
          this.makeToast();
          this.$fetch();
          //this.reset();
          //this.$router.push("/transactions");
        })
        .catch((error) => {
          console.log(error);
          //if (error.response && error.response.status !== 422) throw error;

          //this.errors = Object.values(error?.response?.data?.errors).flat();
        });
    },
  },
  async fetch() {
    const response = await this.$axios.$get(
      `/api/users?page=${this.pagination.current_page}`
    );

    this.users = response.data;
    this.pagination = response?.meta;
  },
};
</script>
