<template>
  <h1 class="mt-4">Catégories d'opérations</h1>
</template>
<script>
export default {
  middleware: "auth",
  auth: "guest",
  head() {
    return {
      title: "Catégories — Wallet",
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
