<template>
  <section class="upload flex justify-center items-center h-full container p-4 max-w-xl mx-auto">
    <div class="w-full bg-slate-700 rounded-lg shadow-lg overflow-hidden">
       <form :action="insert_url" method="POST" enctype="multipart/form-data" class="p-14 text-xs sm:text-base" ref="form_upload">
        <input
          name="file_to_upload[]"
          required
          class="cursor-pointer text-white form-input w-full bg-blue-600 rounded-full"
          type="file"
          ref="files"
          multiple
        >
        <span class="hidden text-red-700 font-bold" ref="filesError">
          Seleziona almeno un file!
        </span>
        <p class="text-white pt-4">
          Vuoi rendere la foto publica?
        </p>
        <div class="flex gap-6 justify-center">
          <div class="flex gap-3">
            <label class="text-white" for="forAllSi">Sì</label>
            <input type="radio" name="forAll" id="forAllSi" value="si" required>
          </div>
          <div class="flex gap-3">
            <label class="text-white" for="forAllNo">No</label>
            <input checked type="radio" name="forAll" id="forAllNo" value="no" required>
          </div>
        </div>
        <div class="text-center">
          <input type="submit" value="CARICA" class="btn cursor-pointer text-white mt-2 bg-blue-600 p-3 border border-white rounded-full hover:bg-blue-950" @click="upload">
        </div>
      </form>
    </div>
    <div class="layover" v-if="loading" id="layover-loading">
        <img :src="require('@/assets/img/loading.gif')" alt="" width="200">
    </div>
  </section>
</template>

<script>
import { API_INSERTIMG_URL } from '/config.js';

  export default {
    data() {
      return {
        insert_url: API_INSERTIMG_URL,
        loading: false,
      }
    },
    methods: {
      upload(event) {
        const form = this.$refs.form_upload;
        const files = this.$refs.files;
        const filesError = this.$refs.filesError;
        event.preventDefault();
        if (!files.files.length) {
          files.classList.add('border-red-600', 'border-2');
          filesError.classList.remove('hidden');
          return;
        }
        this.loading = true;
        form.submit();
      },
    },
    mounted() {
      document.title = 'myCloud - Upload';
    },
  }
</script>

<style lang="scss" scoped>

  .layover {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
  }

</style>
