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
    <image-container :image="src" :index="key" :pagina="pagina" />
  </div>

</template>

<script>

import ImageContainer from "@/components/ImageContainer";

  export default {
    components: {
      ImageContainer
    },
    props: {
      images: Array,
      pagina: Number,
    },
    computed: {
      path() {
        const paths = [];
        // ciclo l'array images contenente oggetti così composti: {filename, username} per creare i path:
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
      };
    },
    mounted() {
    },
  };

</script>
