<template>
  <div class="text-center signin">
    <form @submit.prevent="submit" class="form-signin">
      <div class="text-center mb-4">
        <img class="mb-4" alt width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal">SignIn</h1>
        <p></p>
        <code>{{form}}</code>
      </div>

      <div class="form-label-group">
        <input
          type="identifier"
          id="inputIdentifier"
          class="form-control"
          placeholder="Email address or Username"
          required
          autofocus
          v-model="form.identifier"
        />
        <label for="inputIdentifier">Email address or Username</label>
      </div>

      <div class="form-label-group">
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          required
          v-model="form.password"
        />
        <label for="inputPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" v-model="form.rememberMe" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {mapActions} from 'vuex'

export default {
  name: "SignIn",
  components: {},
  data() {
    return {
      form: {
        identifier :'',
        password:'',
        rememberMe:false
      }
    }
  },
  methods: {
    ...mapActions({
      signIn : 'auth/signIn'
    }),
    submit(){
      this.signIn(this.form).then(() => this.$router.replace({name:'dashboard'}))
    }
  },
};

</script>


<style>
:root {
  --input-padding-x: 0.75rem;
  --input-padding-y: 0.75rem;
}

.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: 0 auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}
</style>