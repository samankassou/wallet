<template>
  <div>
    <h1 class="mt-4">Historique de vos opérations</h1>
    <b-row class="mb-4">
      <b-col>
        <b-btn variant="outline-primary" to="/transactions/expense">
          Enregistrer une dépense
        </b-btn>
        <b-btn to="/transactions/income"> Déclarer un revenu </b-btn>
      </b-col>
    </b-row>
    <b-table
      striped
      hover
      :items="transactions"
      :fields="formattedFileds"
      :busy.sync="$fetchState.pending"
      :tbody-tr-class="rowClass"
    >
    </b-table>
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
  },
  methods: {
    rowClass(item) {
      if (!item) return;
      if (item.type === "expense") return "table-danger";
      if (item.type === "income") return "table-success";
    },
  },
  async fetch() {
    const response = await this.$axios.$get("/api/transactions");

    this.transactions = response.data;
  },
};
</script>
