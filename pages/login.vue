<template>
  <b-row class="mt-5">
    <b-col></b-col>
    <b-col>
      <b-card>
        <h1>Se connecter</h1>
        <Errors class="mb-5" :errors="errors"></Errors>
        <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Your password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3">
            <b-form-checkbox v-model="form.remember" :value="true"
              >Se souvenir?</b-form-checkbox
            >
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
      title: "Se connecter — Wallet",
    };
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        remember: false,
      },
      pending: false,
      errors: [],
      show: true,
    };
  },
  methods: {
    onSubmit() {
      this.pending = true;
      this.errors = [];
      this.$auth
        .loginWith("cookie", {
          data: {
            email: this.email,
            password: this.password,
            remember: this.remember,
          },
        })
        .then(() => this.$router.push("/"))
        .catch((error) => {
          if (error.response.status !== 422) throw error;

          this.errors = Object.values(error.response.data.errors).flat();
        })
        .finally(() => {
          this.pending = false;
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
      this.form.remember = false;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
