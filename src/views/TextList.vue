<template>
  <div class="text container">
      <router-link class="btn btn-block btn-success" :to="{name:'texts.show', params:{id:'create'}}">New Data</router-link> 
      <div class="row text-center">
    <div v-for="(item, $index) in texts" :key="$index" class="col-md-3">
      <router-link :to="{name:'texts.show', params:{id:item.id}}">{{item.id}} | {{item.text}}</router-link> | {{item.traductions.length}} Traduction
    </div></div>
    <InfiniteLoading spinner="waveDots" @infinite="infiniteHandler"></InfiniteLoading>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import InfiniteLoading from "vue-infinite-loading";

export default {
  name: "TextList",
  components: {
    InfiniteLoading
  },
  mounted() {},
  methods: {
    ...mapActions({
      loadTexts: "text/LOAD_TEXTS"
    }),
    infiniteHandler($state) {
      console.log(this.currentPage)
      this.loadTexts(this.currentPage ).then(() => {
        $state.loaded();
      });

      if (this.completed) $state.complete();
    }
  },
  computed: {
    ...mapGetters({
      texts: "text/getTexts",
      completed: "text/completed",
      currentPage: "text/getCurrentPage"
    })
  },
  created() {
    this.$store.dispatch("text/LOAD_TEXTS"); // replace it with your action
  }
};
</script>
