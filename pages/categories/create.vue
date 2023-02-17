<template>
  <div>
    <b-card title="Enregister une catégorie">
      <b-form @submit.prevent="save">
        <Errors class="mb-5" :errors="errors"></Errors>
        <b-form-group id="input-group-1" label="Libellé:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="title"
            type="text"
            placeholder="Entrer le libellé"
            required
          ></b-form-input>
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
  middleware: "auth",
  data() {
    return {
      title: "",
      errors: [],
    };
  },

  methods: {
    save() {
      this.$axios
        .post("api/categories", {
          title: this.title,
        })
        .then((res) => {
          this.$router.push("/categories");
        })
        .catch((error) => {
          if (error.response && error.response.status !== 422) throw error;

          this.errors = Object.values(error.response.data.errors).flat();
        });
    },
  },
};
</script>
