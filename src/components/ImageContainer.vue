<template>
    <img
        :class="!imageLoaded ? 'hidden' : ''"
        class="max-w-full max-h-72 my_img"
        :src="srcCompressed"
        alt=""
        @mouseover="showKey = index"
        @load="imageLoaded = true"
        @error="imageError = true"
    >
    <img v-if="!imageLoaded && !imageError" :src="require('@/assets/img/classicLoading.gif')" alt="Loading img">
    <img v-if="imageError" :src="require('@/assets/img/notFound.png')" alt="Loading img" @mouseover="showKey = index">
    <div
        class="layover flex gap-4"
        :class="showKey === index ? 'flex' : 'hidden'"
        @mousemove="showKey = index"
        @mouseleave="showKey = null"
    >
      <div
          class="text-white font-bold cursor-pointer bg-blue-500 border-white border-2 p-3 uppercase hover:bg-blue-950"
          @click="downloadImage(srcOriginal)"
      >
        download
      </div>
      <div
          class="text-white font-bold cursor-pointer bg-red-500 border-white border-2 p-3 uppercase hover:bg-red-950"
          @click="deleteFile(filename, imageError)"
      >
        elimina
      </div>
  </div>
</template>

<script>
import {API_DELETEIMG_URL, IMGS_DIR } from '/config.js';
import axios from "axios";

export default {
  props: {
    image: Object,
    index: Number,
    pagina: Number,
  },
  computed: {
    srcCompressed() {
      const compressed_filename = this.getCompressedFilename(this.image.filename);

      // IMGS_DIR (percorso alla cartella cloudImgs dentro a myCloud) + username/ (sottocartella) + compressed_filename (compressed_filename.webp)
      return `${IMGS_DIR}${this.image.username}/${compressed_filename}`;
    },
    srcOriginal() {
      return `${IMGS_DIR}${this.image.username}/${this.image.filename}`;
    },
    filename() {
      return `${this.image.username}/${this.image.filename}`;
    }
  },
  data() {
    return {
      currentIndex: 0,
      showKey: null,
      imageLoaded: false,
      imageError: false,
    };
  },
  methods: {
    /**
     * 
     * Funzione per ottenere il filename dell'immagine
     * compressa dal filename originale.
     * Devo ciclare su filename.split al punto, in quanto l'immagine
     * originale potrebbe avere dei "punti" nel nome, quindi ciclo fino
     * all'ultimo elemento, a quel punto non lo aggiungo (sarà l'estensione)
     * ritorno quello che ho ottenuto concatenando 'webp'
     * 
     * @param String filename
     * 
     */
    getCompressedFilename(filename) {
      const filenameArray = filename.split('.');
      let compressed_filename = "compressed_";
      filenameArray.forEach((element, key) => {
        if (key !== filenameArray.length - 1) {
          compressed_filename += `${element}.`;
        }
      });
      return compressed_filename + 'webp';
    },
    deleteFile(filename, imageError = false) {
      this.$store.commit('setLoading', true);

      const options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      };

      axios.post(API_DELETEIMG_URL, {
        filename: filename,
        pagina: this.pagina,
        error: imageError,
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
    },
    downloadImage(link) {
        const imageUrl = link;
        console.log(imageUrl);

        // Usa fetch per ottenere i dati dell'immagine
        fetch(imageUrl)
          .then(response => response.blob())
          .then(blob => {
            // Crea un oggetto URL per il blob
            const url = window.URL.createObjectURL(blob);

            // Crea un elemento <a> per il download
            const a = document.createElement('a');
            a.href = url;
            // Specifica il nome del file da scaricare
            let nomeImg = link.split('/');
            nomeImg = nomeImg[(nomeImg.length - 1)];
            a.download = nomeImg;

            // Aggiungi l'elemento <a> al documento
            document.body.appendChild(a);

            // Simula un clic sull'elemento <a> per avviare il download
            a.click();

            // Rimuovi l'elemento <a> dal documento
            document.body.removeChild(a);

            // Rilascia l'URL dell'oggetto blob
            window.URL.revokeObjectURL(url);
          })
          .catch(error => console.error('Errore durante il download dell\'immagine:', error));
    },
  },
  watch: {
    $route() {
      this.currentIndex = 0;
      this.showKey = null;
      this.imageLoaded = false;
      this.imageError = false;
    },
    pagina() {
      this.currentIndex = 0;
      this.showKey = null;
      this.imageLoaded = false;
      this.imageError = false;
    },
  },
  mounted() {
  },
};

</script>

<style lang="scss">

  .layover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 2;
      /* display: flex; */
      align-items: center;
      justify-content: center;
  }

</style>
