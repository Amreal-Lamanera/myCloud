<template>
    <div class="bg-slate-700 rounded-lg">
      <h3 class="text-3xl py-3 border-b-2 border-white">
        {{data.titolo}}
      </h3>

      <div class="p-4 border-b-2 border-white flex justify-center" id="img-container">
        <img :src="src" class="max-w-full rounded-lg">
      </div>

      <div id="descrizione-container">
        <p class="text-lg p-6 text-left" v-html="data.descrizione">
        </p>
      </div>
    </div>
</template>

<script>

import {IMGS_DIR} from "../../config";

export default {
  props: {
    data: Object,
  },
  computed: {
    src() {
      return `${IMGS_DIR}raven/${this.data.foto}`;
    }
  },
  mounted() {
    console.log(this.data)
  }
}

</script>

<style lang="scss" scoped>
img {
  max-height: 600px;
}
</style>