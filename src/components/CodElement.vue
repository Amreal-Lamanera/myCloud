<template>
    <div class="bg-slate-700 rounded-lg p-3">
      <h3 class="text-3xl py-3 border-b-2 border-white">
        {{data.titolo}}
      </h3>

      <div class="p-4 border-b-2 border-white flex justify-center" id="img-container">
        <img :src="src" class="max-w-full rounded-lg">
      </div>

      <div id="descrizione-container">
        <p class="text-lg py-3 text-left" v-html="data.descrizione.replace(/\r\n/g, '<br>')">
        </p>
      </div>
      
      <div id="delete-container" v-if="isSuperUser"
      class="text-white font-bold cursor-pointer bg-red-500 border-white border-2 p-3 uppercase hover:bg-red-950"
      @click="deleteElement">
        elimina
      </div>
    </div>
</template>

<script>

import {IMGS_DIR, API_DELETERAVEN_URL} from "../../config";
import axios from "axios";

export default {
  props: {
    data: Object,
  },
  computed: {
    src() {
      return `${IMGS_DIR}raven/${this.data.foto}`;
    },
    isSuperUser() {
      // solo il superuser può eliminare le immagini
      return this.$store.state.superuser;
    },
  },
  methods: {
    deleteElement() {
        this.$store.commit('setLoading', true);

      const options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      };

      axios.post(API_DELETERAVEN_URL, {
        id: this.data.id,
        img: this.data.foto,
        pagina: this.pagina,
      }, options)
          .then((response) => {
            // window.location.reload(true);
            if (response.data.pagina) {
              // Aggiungere o modificare un parametro
              let pagina = response.data.pagina;

              // Aggiornare l'URL con il nuovo parametro
              // history.replaceState({}, document.title, window.location.pathname + queryString);
              this.$store.commit('setPage', pagina);
              this.$store.commit('setRedirect', this.$route.name);
              // window.location.reload(true);
              this.$router.replace('blankPage');
            } else if (response.data.status === 'KO') {
              // Aggiungere o modificare un parametro
              this.$store.commit('setError', response.data.message);
              this.$store.commit('setRedirect', this.$route.name);

              // Aggiornare l'URL con il nuovo parametro
              this.$router.replace('blankPage');
            } else {
              // Ricaricare la pagina ignorando la cache
              window.location.reload(true);
            }
          })
          .catch(function (error) {
            console.log("errore: " + error);
          });
    }
  },
  mounted() {
    console.log(this.data.descrizione)
  }
}

</script>

<style lang="scss" scoped>
img {
  max-height: 600px;
}
</style>