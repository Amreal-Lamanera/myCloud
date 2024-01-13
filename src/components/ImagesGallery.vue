<template>
  <div
      class="
        relative
        h-full
        flex
        items-center
        justify-center"
        v-for="(src, key) in images"
        :key="key
      "
  >
    <image-container :path="imgs_dir + src" :filename="src" :index="key" :pagina="pagina" />
  </div>
</template>

<script>

import {API_DELETEIMG_URL, IMGS_DIR} from '/config.js';
import axios from "axios";
import ImageContainer from "@/components/ImageContainer";

  export default {
    components: {ImageContainer},
    props: {
      images: Array,
      pagina: Number,
    },
    data() {
      return {
        currentIndex: 0,
        imgs_dir: null,
        showKey: null,
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
        }, options)
        .then(function () {
          window.location.reload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    },
    mounted() {
      this.imgs_dir = IMGS_DIR;
    },
  };

</script>
