<template>
  <div class="home">
    Dashboard
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  mounted() {
    
  },
  methods: {
    
  },
    computed: {
    ...mapGetters({
      texts: 'text/getTexts',
    })
  },
   created () {
    this.$store.dispatch('text/LOAD_TEXTS') // replace it with your action
  }
}
</script>
