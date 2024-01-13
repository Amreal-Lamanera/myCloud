<template>
  <section class="upload flex justify-center items-center h-full container p-4 max-w-xl mx-auto">
    <div class="w-full bg-slate-700 rounded-lg shadow-lg overflow-hidden">
       <form :action="insert_url" method="POST" enctype="multipart/form-data" class="p-14 text-xs sm:text-base" id="form-upload">
        <input
          name="file_to_upload[]"
          required
          class="cursor-pointer text-white form-input w-full bg-blue-600 rounded-full"
          type="file"
          multiple
        >
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
            <input type="radio" name="forAll" id="forAllNo" value="no" required>
          </div>
        </div>
        <div class="text-center">
          <input type="submit" value="CARICA" class="btn cursor-pointer text-white mt-2 bg-blue-600 p-3 border border-white rounded-full hover:bg-blue-950">
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { API_INSERTIMG_URL } from '/config.js';

  export default {
    data() {
      return {
        insert_url: null,
      }
    },
    mounted() {
      document.title = 'myCloud - Upload';
      this.insert_url = API_INSERTIMG_URL;
    },
  }
</script>
