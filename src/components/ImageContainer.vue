<template>
<!--        loading="lazy"-->
    <img
        :class="!imageLoaded ? 'hidden' : ''"
        title="Click per download"
        class="max-w-full max-h-full my_img"
        :src="path"
        alt=""
        @mouseover="showKey = index"
        @load="imageLoaded = true"
    >
    <img v-if="!imageLoaded" :src="require('@/assets/img/loading.gif')" alt="Loading img">
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
          @click="deleteFile(filename)"
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
      imageLoaded: false
    };
  },
  methods: {
    deleteFile(filename) {
      const options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      };

      axios.post(API_DELETEIMG_URL, {
        filename: filename,
        pagina: this.pagina
      }, options)
          .then(function (response) {
            console.log(response);
            console.log(response.data.pagina);
            // window.location.reload(true);
            if (response.data.pagina) {
              // Aggiungere o modificare un parametro
              let pagina = response.data.pagina;
              let queryString = `?pagina=${pagina}`;

              // Aggiornare l'URL con il nuovo parametro
              history.replaceState({}, document.title, window.location.pathname + queryString);
              window.location.reload(true);
            } else {
              // Ricaricare la pagina ignorando la cache
              window.location.reload(true);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    test() {
      console.log('TEST');
    }
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
