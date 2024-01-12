<template>
  <div class="py-6">
    <div v-if="error" class="pb-6">
      <span class="text-xl text-red-500 bg-gray-200 p-3 border-4 border-red-500">
        {{ error}}
      </span>
    </div>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-4 p-4">
      <image-gallery :images="srcs" :pagina="pagina" />
    </div>
    <div class="flex gap-4 justify-center pt-6">
      <button
          class="
            btn
            text-white
            p-3
            border-4
            border-white
            rounded-full
            font-bold
          "
          @click="(pagina === 0) ? '': handlerPagina('back')"
          :class="(pagina === 0) ? 'bg-gray-900' : 'bg-blue-600 hover:bg-blue-950'"
      >
        back
      </button>
      <button
          class="
            btn
            text-white
            p-3
            border-4
            border-white
            rounded-full
            font-bold
          "
          @click="((maxPerPagina * (pagina + 1)) > (srcImgsList.length - 1)) ? '' : handlerPagina('next')"
          :class="((maxPerPagina * (pagina + 1)) > (srcImgsList.length - 1)) ? 'bg-gray-900' : 'bg-blue-600 hover:bg-blue-950'"
      >
        next
      </button>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios';
  // import { cacheAdapterEnhancer } from 'axios-extensions';
  import { API_GETIMGS_URL } from '/config.js';
  import ImageGallery from '@/components/ImagesGallery.vue';
  // import Store from '@/store/index';

  export default {
    name: 'HomeView',
    components: {
      ImageGallery
    },
    props: {
      username: String,
      superuser: String,
      forAll: Boolean,
    },
    data() {
      return {
        srcImgsList: [],
        maxPerPagina: 12,
        pagina: 0,
        error: null
      };
    },
    computed: {
      srcs() {
        let array = [];
        for (let i = (this.maxPerPagina * this.pagina); i < (this.maxPerPagina * (this.pagina + 1)); i++) {
          console.log(i);
          if (!this.srcImgsList[i]) {
            break;
          }
          array.push(this.srcImgsList[i]);
        }
        console.log(array);
        console.log(this.pagina);
        return array;
      },
    },
    methods: {
      // Funzione per effettuare la chiamata API
      async fetchData() {
        try {
          console.log('SUPER: ' + this.superuser);
          const options = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          };
          let queryString = '';
          if (this.superuser === 'true') {
            queryString = '?username=superuser';
            console.log(queryString);
          } else if (this.forAll) {
            queryString = '?username=all';
            console.log(queryString);
          } else {
            queryString = '?username=' + this.username;
            console.log(queryString);
          }
          // Esegui la chiamata API utilizzando axios
          const response = await axios.get(API_GETIMGS_URL + queryString, options);
          console.log(response);
          
          // Salva i dati ottenuti dalla chiamata nell'oggetto 'srcImgsList'
          this.srcImgsList = response.data;
          console.log(this.srcImgsList);
        } catch (error) {
          console.error('Errore durante la chiamata API:', error);
        }
      },
      setDocumentTitle() {
        document.title = 'myCloud - Home';
      },

      async loadData() {
        this.srcImgsList = [];
        this.fetchData();
      },
      handlerPagina(operazione) {
        if (operazione === 'next') {
          this.pagina++;
        } else if (operazione === 'back') {
          this.pagina--;
        }
        this.scrollToTop();
      },
      scrollToTop() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

        if (currentScroll > 0) {
          window.requestAnimationFrame(this.scrollToTop);
          window.scrollTo(0, currentScroll - currentScroll / 8);
        }
      }
    },
    watch: {
      $route() {
        this.pagina = 0;
        this.loadData();
      },
    },
    mounted() {
      console.log("mounted");
      console.log(this.superuser);
      console.log(this.forAll);
      this.setDocumentTitle();
      this.loadData();
    },
    beforeMount() {
      if (this.$route.query.error) {
        this.error = this.$route.query.error;
      }
      if (this.$route.query.pagina) {
        this.pagina = this.$route.query.pagina;
      }
    }
  }
</script>

<style lang="scss">

  .layover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 10000;
      /* display: flex; */
      align-items: center;
      justify-content: center;
  }

</style>
