<template>
  <section class="">
    <error-component :errorMsg="errorMsg" />
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
  </section>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios';
  import { API_GETIMGS_URL } from '/config.js';
  import Store from '@/store/index';
  import ImageGallery from '@/components/ImagesGallery';
  import ErrorComponent from '@/components/ErrorComponent';

  export default {
    name: 'HomeView',
    components: {
      ImageGallery,
      ErrorComponent,
    },
    props: {
    },
    data() {
      return {
        srcImgsList: [],
        maxPerPagina: 12,
        pagina: 0,
        errorMsg: '',
      };
    },
    computed: {
      srcs() {
        let array = [];
        for (let i = (this.maxPerPagina * this.pagina); i < (this.maxPerPagina * (this.pagina + 1)); i++) {
          if (!this.srcImgsList[i]) {
            break;
          }
          array.push(this.srcImgsList[i]);
        }
        // console.log(array);
        return array;
      },
    },
    methods: {
      // Funzione per effettuare la chiamata API
      async fetchData() {
        try {
          const options = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          };

          let queryString = '';
          switch (this.$route.name) {
            case 'LeTueFoto':
              if (Store.state.username) {
                queryString = '?username=' + Store.state.username;
              } else {
                this.$router.replace({ name: 'home' });
              }
              break;
            case 'public':
              queryString = '?username=all';
              break;
            case 'all':
              if (Store.state.superuser) {
                queryString = '?username=superuser';
              } else {
                this.$router.replace({ name: 'home' });
              }
              break;
            default:
              this.$router.replace({ name: 'home' });
              break;
          }

          // Esegui la chiamata API utilizzando axios
          const response = await axios.get(API_GETIMGS_URL + queryString, options);
          
          // Salva i dati ottenuti dalla chiamata nell'oggetto 'srcImgsList'
          this.srcImgsList = response.data;
          // console.log(this.srcImgsList);
        } catch (error) {
          this.errorMsg = 'Si è verificato un errore, contattare l\'amministratore. Errore: ' + error;
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
        this.errorMsg = '';
        if (this.$route.query.pagina) {
          this.pagina = Number(this.$route.query.pagina);
        }
        this.loadData();
      },
    },
    mounted() {
      this.setDocumentTitle();
      this.loadData();
      this.pagina = Number(Store.state.page);
      Store.commit('setPage', 0);
    },
    beforeMount() {
      if (Store.state.error) {
        this.errorMsg = Store.state.error;
        Store.commit('setError', '');
      }
      if (this.$route.query.pagina) {
        this.pagina = Number(this.$route.query.pagina);
      }
    }
  }
</script>
