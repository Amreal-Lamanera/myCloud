<template>
  <section class="upload flex justify-center items-center h-full container p-4 max-w-xl mx-auto">
    <div class="w-full bg-slate-700 rounded-lg shadow-lg overflow-hidden">
       <form :action="insert_url" method="POST" enctype="multipart/form-data" class="p-14 text-xs sm:text-base text-white flex flex-col gap-3" ref="form_upload">
         <div class="flex flex-col gap-3" id="map_container">
           <label for="map">
             Mappa / Categoria:
           </label>
           <input type="text" id="map" name="map" required>
         </div>
         <div class="flex flex-col gap-3" id="title_container">
           <label for="title">
             Titolo strategia:
           </label>
           <input type="text" id="title" name="title" required>
         </div>
         <div class="flex flex-col gap-3" id="ph_container">
           <label for="ph">
             Foto strategia:
           </label>
          <input
            id="ph"
            name="file_to_upload[]"
            required
            class="cursor-pointer text-white form-input w-full bg-blue-600 rounded-full"
            type="file"
            ref="files"
          >
          <span class="hidden text-red-700 font-bold" ref="filesError">
            Seleziona almeno un file!
          </span>
         </div>
         <div class="flex flex-col gap-3" id="descrizione">
           <label for="descrizione">
             Descrizione strategia:
           </label>
           <textarea name="descrizione" id="descrizione" cols="30" rows="10"></textarea>
         </div>
         <select name="categoria" id="categoria"
         class="w-full p-2 bg-slate-400 text-white rounded-lg">
            <option value="">- SELEZIONA CATEGORIA -</option>
            <option value="mappe">Mappe</option>
            <option value="classi">Classi</option>
         </select>
        <div class="text-center">
          <input type="submit" value="CARICA" class="btn cursor-pointer text-white mt-2 bg-blue-600 p-3 border border-white rounded-full hover:bg-blue-950" @click="upload">
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { API_INSERT_STRAT_XFOW_URL } from '/config.js';

  export default {
    data() {
      return {
        insert_url: API_INSERT_STRAT_XFOW_URL,
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
        this.$store.commit('setLoading', true);
        form.submit();
      },
    },
    mounted() {
      this.$store.commit('setLoading', false);
      document.title = 'myCloud - Upload';
    },
  }
</script>

<style lang="scss" scoped>
label {
  text-align: left;
}
input[type='text'], textarea {
  color: black;
}
</style>
