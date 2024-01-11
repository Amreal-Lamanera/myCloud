<template>
  <div class="relative h-full flex items-center" v-for="(src, key) in images" :key="key">
    <img
        loading="lazy"
        title="Click per download"
        class="max-w-full max-h-full"
        :src="imgs_dir + src"
        alt=""
        @mouseover="showKey = key"
        @mouseout="showKey = null"
    >
    <div
        class="layover flex gap-4"
        :class="showKey === key ? 'flex' : 'hidden'"
        @mousemove="showKey = key"
        @mouseleave="showKey = null"
    >
      <div
          class="text-white font-bold cursor-pointer bg-blue-500 border-white border-2 p-3 uppercase hover:bg-blue-950"
          @click="downloadImage(imgs_dir + src)"
      >
        download
      </div>
      <div
          class="text-white font-bold cursor-pointer bg-red-500 border-white border-2 p-3 uppercase hover:bg-red-950"
          @click="deleteFile(src)"
      >
        elimina
      </div>
    </div>
  </div>
</template>

<script>

  import { IMGS_DIR } from '/config.js';

  export default {
    props: {
      images: Array
    },
    data() {
      return {
        currentIndex: 0,
        imgs_dir: null,
        showKey: null,
      };
    },
    // computed: {
    //   currentImage() {
    //     return this.images[this.currentIndex];
    //   }
    // },
    // methods: {
    //   nextImage() {
    //     if (this.currentIndex < this.images.length - 1) {
    //       this.currentIndex++;
    //     }
    //   },
    //   prevImage() {
    //     if (this.currentIndex > 0) {
    //       this.currentIndex--;
    //     }
    //   }
    // },
    mounted() {
      this.imgs_dir = IMGS_DIR;
    },
  };

</script>
