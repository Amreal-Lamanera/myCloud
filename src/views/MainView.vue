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
              if (this.$store.state.username) {
                queryString = '?username=' + this.$store.state.username;
              } else {
                this.$router.replace({ name: 'home' });
              }
              break;
            case 'public':
              queryString = '?username=all';
              break;
            case 'all':
              if (this.$store.state.superuser) {
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
          
          // Salva i dati ottenuti dalla chiamata nell'array 'srcImgsList' creando un oggetto {filename, username}
          response.data.forEach(element => {
            this.srcImgsList.push({
              filename: element.filename,
              username: element.username,
            });
          });
          if (!this.srcImgsList[(this.maxPerPagina * this.pagina)] && this.pagina > 0) {
            this.pagina--;
          }
          this.$store.commit('setLoading', false);
        } catch (error) {
          this.errorMsg = 'Si è verificato un errore, contattare l\'amministratore. Errore: ' + error;
          this.$store.commit('setLoading', false);
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
      this.pagina = Number(this.$store.state.page);
      this.$store.commit('setPage', 0);
    },
    beforeMount() {
      if (this.$store.state.error) {
        this.errorMsg = this.$store.state.error;
        this.$store.commit('setError', '');
      }
      if (this.$route.query.pagina) {
        this.pagina = Number(this.$route.query.pagina);
      }
    }
  }
</script>
