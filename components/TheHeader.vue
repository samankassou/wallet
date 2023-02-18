<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Wallet</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/transactions">Opérations</b-nav-item>
          <template v-if="$auth.user && $auth.user.role == 'admin'">
            <b-nav-item to="/categories">Catégories</b-nav-item>
            <b-nav-item to="/users">Utilisateurs</b-nav-item>
          </template>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <p v-if="$auth.user">
            <em>
              {{ $auth.user.firstname + " " + $auth.user.lastname }}
            </em>
          </p>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-if="$auth.user">
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#" @click="logout"
                >Sign Out</b-dropdown-item
              >
            </template>
            <template v-else>
              <b-dropdown-item to="/login">Se connecter</b-dropdown-item>
              <b-dropdown-item to="/register">S'enregistrer</b-dropdown-item>
            </template>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();

      this.$router.push("/login");
    },
  },
};
</script>
