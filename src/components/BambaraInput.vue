
<template>
  <Keyboard ref="kbBambara" class="ui-keyboard-case" :value="this.value" className="form-control" :options="keyboardOption" v-model="text" @input="handleChange"  />
</template>

<script>
// import { Keyboard } from 'vue-virtual-keyboard';
import Keyboard from './keyboard'
export default {
  props: {
    value: String,
    debug: Boolean
  },
  components: {
    Keyboard
  },
  data() {
    return {
      text: this.value || "",
      keyboardOption: {
        layout: "custom",
        usePreview: false,
        stickyShift: false,
        autoAccept: true,
        type: "textarea",
        customLayout: {
          normal: [
            // "n(a):title_or_tooltip"; n = new key, (a) = actual key, ":label" = title_or_tooltip (use an underscore "_" in place of a space " ")
            "\u025B:lower_case_alpha_epsilon \u0254:lower_case_o_ouvert \u0272:lower_case_hameçon_à_gauche \u014B:lower_case_hameçon_à_droite", // lower case Bambara
            " ̀  ́  ̌  ̂",
            "{shift} {cancel}"
          ],
          shift: [
            "\u0190 \u0186 \u019D \u014A", // upper case
            " ̀  ́  ̌  ̂",
            "{shift} {cancel}"
          ]
        },
        display: {
          // overwrite key display
          accept: "Accept",
          bksp: "BKSP",
          cancel: "Cancel",
          enter: "Enter"
        }
      }
    };
  },
  methods: {
    handleChange (input) {
      this.$emit('input', input)
      this.$emit('onChange', input)
    }
  },
  mounted() {
    console.log(this.value, this.text)
    this.$refs.kbBambara.$refs.keyboardRef.value= this.text
  }
};
</script>