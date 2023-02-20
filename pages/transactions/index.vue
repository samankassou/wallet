<template>
  <div>
    <h1 class="mt-4">Historique de vos opérations</h1>
    <b-row class="mb-4">
      <b-col>
        <b-btn variant="outline-info" to="/transactions/expense">
          <b-icon-cash></b-icon-cash>
          Enregistrer une dépense
        </b-btn>
        <b-btn variant="info" to="/transactions/income">
          <b-icon-credit-card></b-icon-credit-card>
          Déclarer un revenu
        </b-btn>
        <b-btn variant="info">
          <b-icon-printer></b-icon-printer>
          Imprimer
        </b-btn>
      </b-col>
    </b-row>
    <b-table
      id="transactions"
      striped
      hover
      :items="transactions"
      :fields="formattedFileds"
      :busy.sync="$fetchState.pending"
      :tbody-tr-class="rowClass"
      :per-page="pagination?.per_page"
      :total-rows="pagination.total"
    >
      <template #table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>
    <b-pagination
      :value="pagination.current_page"
      :total-rows="pagination.total"
      :per-page="pagination?.per_page"
      aria-controls="transactions"
      variant="info"
      @change="handlePageChange"
    ></b-pagination>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  head() {
    return {
      title: "Opérations — Wallet",
    };
  },
  data: () => ({
    pagination: {
      current_page: 1,
    },
    fields: [
      {
        key: "type",
        label: "Type",
      },
      {
        key: "amount",
        label: "Montant",
      },
      {
        key: "category.title",
        label: "Catégories",
      },
      {
        key: "created_at",
        label: "Date",
      },
    ],
    transactions: [],
  }),
  computed: {
    formattedFileds() {
      if (this.$auth.user.role == "admin") {
        this.fields.unshift({
          key: "user.firstname",
          label: "Utilisateur",
        });
      }
      return this.fields;
    },
    rows() {
      return this.transactions.length;
    },
  },
  methods: {
    handlePageChange(value) {
      this.currentPage = value;
      this.$fetch();
    },
    rowClass(item) {
      if (!item) return;
      if (item.type === "expense") return "table-danger";
      if (item.type === "income") return "table-success";
    },
  },
  async fetch() {
    const response = await this.$axios.$get(
      `/api/transactions?page=${this.pagination.current_page}`
    );

    this.transactions = response.data;
    this.pagination = response?.meta;
  },
};
</script>
