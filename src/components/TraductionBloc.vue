<template>
  <form @submit.prevent="submit" class="container-fluid pb-4 mb-4">
    <div class="card card-border text-center">
      <div class="card-header">
        <div class="input-group mb-3 border-gray pb-2 mb-0">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Language</label>
          </div>
          <select class="custom-select" id="inputGroupSelect01" v-model="form.lang">
            <option selected>Choose...</option>
            <option value="french">French</option>
            <option value="english">English</option>
          </select>
        </div>
      </div>
      <div class="card-body">
        <textarea id="text" class="form-control" rows="3" v-model="form.text"></textarea>
      </div>
      <div class="card-footer row text-center">
        <button @click="submit" type="button" class="btn btn-success col-md-4">Save</button>
        <button @click="remove" v-if="this.form.id!=='create'" class="btn btn-danger col-md-4">DELETE</button>
        <button @click="$emit('close')" class="btn btn-dark col-md-4">Close</button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    textId: {
      required: true
    },
    lang: {
      default: ""
    },
    text: {
      default: ""
    },
    id: {
      default: null
    }
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user"
    })
  },
  data() {
    return {
      form: {
        id: this.id,
        text: this.text,
        lang: this.lang,
        textId: this.textId
      }
    };
  },
  methods: {
    ...mapActions({
      store: "text/storeTraduction",
      deleteTrad: "text/deleteTraduction"
    }),
    submit() {
      if(this.form.text && this.form.lang)
        this.store(this.form).then(() => this.$emit("close"));
    },
    remove() {
      this.deleteTrad(this.form).then(() => this.$emit("close"));
    }
  }
};
</script>
