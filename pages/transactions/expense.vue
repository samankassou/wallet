<template>
  <div>
    <b-card title="Enregister une dépense">
      <b-form @submit.prevent="save">
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
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      amount: 0,
      type: "expense",
      categories: [],
      selected: null,
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
    async save() {
      const response = await this.$axios.$post("/api/categories", {
        amount: this.amount,
        type: this.type,
        category_id: this.selected,
      });
    },
  },
  async fetch() {
    const response = await this.$axios.$get("/api/categories");

    this.categories = response.data;
  },
};
</script>
