<template>
  <b-row class="mt-5">
    <b-col></b-col>
    <b-col>
      <b-card>
        <h1>S'enregistrer</h1>
        <Errors class="mb-5" :errors="errors"></Errors>
        <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-1" label="Nom(s):" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="firstname"
              type="text"
              placeholder="Noms(s)"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Prénoms:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="lastname"
              type="text"
              placeholder="Prénom(s)"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="Adresse email:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="email"
              type="email"
              placeholder="Votre adresse email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Mot de passe:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="password"
              type="password"
              placeholder="Mot de passe"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-5"
            label="Confirmez:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model="password_confirmation"
              type="password"
              placeholder="Confirmez le mot de passe"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" :disabled="pending"
            >Submit</b-button
          >
          <b-button type="reset" variant="danger" :disabled="pending"
            >Reset</b-button
          >
        </b-form>
      </b-card>
    </b-col>
    <b-col></b-col>
  </b-row>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  head() {
    return {
      title: "S'enregistrer — Wallet",
    };
  },
  data: () => ({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
    pending: false,
    errors: [],
    show: true,
  }),

  methods: {
    onSubmit() {
      this.pending = true;
      this.errors = [];
      this.$axios
        .post("api/auth/register", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        })
        .then((res) => {
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });
        })
        .catch((error) => {
          if (error.response && error.response.status !== 422) throw error;

          this.errors = Object.values(error.response.data.errors).flat();
        })
        .finally(() => {
          this.pending = false;
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      firstname = "";
      lastname = "";
      email = "";
      password = "";
      password_confirmation = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
