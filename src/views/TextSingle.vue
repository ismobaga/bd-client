<template>
  <div class="container" v-if="text">
    <h2 contenteditable>{{text.text}} | {{text.dirty ? 'UnSaved' : 'Saved!'}}</h2>
    {{text.dirty}}
    <!-- <textarea id="text" class="form-control" rows="4" v-model="text.text"></textarea> -->
    <BambaraInput  v-model="text.text" @input="text.dirty=true" />
    <hr>
    <button class="btn btn-success  btn-block" @click="saveBm"> Save</button> 
  <hr>
    <table class="table" v-if="id!=='create'" >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Traduction</th>
          <th scope="col">Lang</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in text.traductions"
          :key="index"
          @click="traduction({...item, textId:text.id})()"
        >
          <th scope="row">{{index}}</th>
          <td>{{item.text}}</td>
          <td>{{item.lang}}</td>
        </tr>

        <tr>
          <td colspan="3">
            <button
              class="btn btn-dark"
              @click="traduction({id:'create', textId:text.id})()"
            >Add New Traduction</button>
          </td>
        </tr>
      </tbody>
    </table>

    <InfiniteLoading spinner="waveDots" @infinite="infiniteHandler"></InfiniteLoading>
    <fab
      :actions="fabActions"
      :mainAction="traduction({id:'create', textId:text.id})"
      @cache="cache"
    ></fab>
    <TraductionBloc v-if="false" />
    <modals-container />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import InfiniteLoading from "vue-infinite-loading";
import fab from "@/components/FAB.vue";
import TraductionBloc from "../components/TraductionBloc.vue";
import BambaraInput from "../components/BambaraInput.vue";


export default {
  name: "TextSignle",
  components: {
    InfiniteLoading,
    fab,
    TraductionBloc,
    BambaraInput
  },
  data() {
    return {
      id : this.$route.params.id,
      fabActions: [
        {
          name: "cache",
          icon: "cached"
        }
      ],
      
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      loadTexts: "text/LOAD_TEXTS",
      storeBm: "text/storeText"
    }),
    saveBm(){
      if(this.text.text)
        this.storeBm({text:this.text.text, id:this.text.id }).then((data) => {
          this.text.dirty=false
          console.log(data)

          console.log(this)
          if (this.id==="create") {
            this.$router.replace({name:'texts'})
          }
        });
    },
    cache(e) {
      console.log(e);
    },
    infiniteHandler($state) {
      this.loadTexts().then(() => {
        $state.loaded();
      });

      if (this.completed) $state.complete();
    },
    traduction({ id = "create", textId, text_id, text, lang }) {
      if (text_id) textId = text_id;
      return () =>
        this.$modal.show(
          TraductionBloc,
          {
            id,
            textId,
            text,
            lang
          },
          {
            draggable: true,
            resizable: true
          }
        );
    }
  },
  computed: {
    ...mapGetters({
      text: "text/getCurrentText",
      completed: "text/completed"
    })
  },
  created() {
    // if (this.$route.params.id !== "create") {
      
      this.$store.dispatch("text/LOAD_TEXT_BY_ID", this.$route.params.id); // replace it with your action
    // }
  }
};
</script>

<style>
/* .keyboard-wrapper{
      display: block;
    width: 100%;
    min-height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    appearance: none;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
} */

</style>