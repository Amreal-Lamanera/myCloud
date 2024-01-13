<template>
<!--        loading="lazy"-->
    <img
        :class="!imageLoaded ? 'hidden' : ''"
        class="max-w-full max-h-full my_img"
        :src="path"
        alt=""
        @mouseover="showKey = index"
        @load="imageLoaded = true"
        @error="imageError = true"
    >
    <img v-if="!imageLoaded && !imageError" :src="require('@/assets/img/loading.gif')" alt="Loading img">
    <img v-if="imageError" :src="require('@/assets/img/notFound.png')" alt="Loading img" @mouseover="showKey = index">
    <div
        class="layover flex gap-4"
        :class="showKey === index ? 'flex' : 'hidden'"
        @mousemove="showKey = index"
        @mouseleave="showKey = null"
    >
      <div
          class="text-white font-bold cursor-pointer bg-blue-500 border-white border-2 p-3 uppercase hover:bg-blue-950"
          @click="downloadImage(path)"
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

import {API_DELETEIMG_URL } from '/config.js';
import axios from "axios";

export default {
  props: {
    path: String,
    filename: String,
    index: Number,
    pagina: Number,
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
    deleteFile(filename, imageError = false) {
      console.log(filename);
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
          .then(function (response) {
            // window.location.reload(true);
            if (response.data.pagina) {
              // Aggiungere o modificare un parametro
              let pagina = response.data.pagina;
              let queryString = `?pagina=${pagina}`;

              // Aggiornare l'URL con il nuovo parametro
              history.replaceState({}, document.title, window.location.pathname + queryString);
              window.location.reload(true);
            } else if (response.data.status === 'KO') {
              // Aggiungere o modificare un parametro
              const error = response.data.message;
              let queryString = `?error=${error}`;

              // Aggiornare l'URL con il nuovo parametro
              history.replaceState({}, document.title, window.location.pathname + queryString);
              window.location.reload(true);
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

<style>
  .my_img {
    background-image: require("@/assets/img/loading.png");
  }
</style>
