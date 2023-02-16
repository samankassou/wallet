<template>
  <div>
    <b-card title="Enregister une dépense">
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
    save() {
      this.$axios
        .$post("api/categories", {
          amount: this.amount,
          type: this.type,
          category_id: this.selected,
        })
        .then((res) => {
          this.$router.push("/");
        })
        .catch((error) => {
          if (error.response && error.response.status !== 422) throw error;

          this.errors = Object.values(error.response.data.errors).flat();
        });
    },
  },
  async fetch() {
    const response = await this.$axios.$get("/api/categories");

    this.categories = response.data;
  },
};
</script>
