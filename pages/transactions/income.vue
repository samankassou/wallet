<template>
  <div>
    <b-card title="Déclarer un revenu">
      <b-form @submit.prevent="save">
        <Errors class="mb-5" :errors="errors"></Errors>
        <b-form-group id="input-group-1" label="Montant:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="amount"
            type="number"
            placeholder="Entrer le montant"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Montant:" label-for="input-1">
          <b-form-select
            id="input-2"
            v-model="selected"
            :options="options"
            required
          ></b-form-select>
        </b-form-group>
        <b-row>
          <b-col>
            <b-btn type="submit">Enregistrer</b-btn>
            <b-btn variant="danger" to="/transactions">Retour</b-btn>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  data() {
    return {
      amount: 0,
      type: "income",
      categories: [],
      selected: null,
      errors: [],
    };
  },
  computed: {
    options() {
      const arr = this.categories.map(function (item) {
        return { value: item.id, text: item.title };
      });
      arr.unshift({ value: null, text: "Sélectionnez une catégorie" });

      return arr;
    },
  },
  methods: {
    makeToast() {
      this.$bvToast.toast(`Revenu enregistré avec succès`, {
        title: "Wallet",
        autoHideDelay: 5000,
        variant: "success",
      });
    },
    save() {
      this.$axios
        .post("api/transactions", {
          amount: this.amount,
          type: this.type,
          category_id: this.selected,
        })
        .then((res) => {
          this.makeToast();
          this.reset();
          //this.$router.push("/transactions");
        })
        .catch((error) => {
          if (error.response && error.response.status !== 422) throw error;

          this.errors = Object.values(error?.response?.data?.errors).flat();
        });
    },
    reset() {
      this.amount = 0;
      this.selected = null;
      this.errors = [];
    },
  },
  async fetch() {
    const response = await this.$axios.$get("/api/categories");

    this.categories = response.data;
  },
};
</script>
