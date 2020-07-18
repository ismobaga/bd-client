<template>
  <div>
    <router-link to="/">Home</router-link>|
    <template v-if="authenticated">
      <router-link to="/me">{{user.name}}</router-link>|
      <router-link to="/texts">Texts</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <a href="#" @click.prevent="signOut">SignOut</a>|
    </template>
    <template v-else>
      <router-link to="/signin">SignIn</router-link>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  methods: {
    ...mapActions({
      signOutAction: "auth/signOut"
    }),
    signOut() {
      this.signOutAction().then(() => {
        this.$router.replace({ name: "signin" });
      });
    }
  }
};
</script>
