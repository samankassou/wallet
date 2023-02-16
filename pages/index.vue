<template>
  <div>
    <b-jumbotron>
      <template #header>Bienvenue sur Wallet!</template>

      <template #lead>
        Une application minimaliste de gestion de budget.
      </template>

      <hr class="my-4" />

      <p>
        Consulter et enregistrer vos dépenses et vos revenus en quelques clics!
      </p>

      <b-button variant="primary" to="/transactions"
        >Historique de vos opérations</b-button
      >
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  //middleware: "auth",
  name: "IndexPage",
  head() {
    return {
      title: "Accueil — Wallet",
    };
  },
};
</script>
