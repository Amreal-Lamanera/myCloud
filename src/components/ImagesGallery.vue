<template>
  <div
      class="
        relative
        h-full
        flex
        items-center
        justify-center"
        v-for="(src, key) in path"
        :key="key
      "
  >
    <image-container :path="imgs_dir + src" :filename="src" :index="key" :pagina="pagina" />
  </div>

</template>

<script>

import { IMGS_DIR} from '/config.js';
import ImageContainer from "@/components/ImageContainer";

  export default {
    components: {ImageContainer},
    props: {
      images: Array,
      pagina: Number,
    },
    computed: {
      path() {
        const paths = [];
        // ciclo l'array images contenente oggetti così composti: {filename, username} per creare i path:
        // IMGS_DIR (percorso alla cartella cloudImgs dentro a myCloud) + username/ (sottocartella) + filename (filename immagine)
        this.images.forEach(element => {
          paths.push(`${element.username}/${element.filename}`);
        });
        return paths;
      },
    },
    data() {
      return {
        currentIndex: 0,
        showKey: null,
        imgs_dir: IMGS_DIR
      };
    },
    mounted() {
    },
  };

</script>
