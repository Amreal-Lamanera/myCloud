<template>
  <section class="px-4">
    <error-component :errorMsg="errorMsg" />
    <div class="container mx-auto">
      <select name="categorie" id="categorie" class="w-full p-4 mb-4 bg-slate-700 text-white text-xl"
              @change="handleCategorie($event.target.value)">
        <option value="" selected disabled>
          - SELEZIONA UNA CATEGORIA -
        </option>
        <template v-for="categoria,i in categorie" :key="i">
            <option :value="categoria" class="capitalize">
                {{ capitalize(categoria) }}
            </option>
        </template>
      </select>
      <select v-if="selectedCategoria" name="maps" id="maps" class="w-full p-4 bg-slate-700 text-white text-xl" ref="mapSelect"
              @change="handleData($event.target.value)">
        <option value="" selected disabled>
            <span v-if="selectedCategoria === 'mappe'">
                - SELEZIONA UNA MAPPA -
            </span>
            <span v-else-if="categorie">
                - SELEZIONA UNA CATEGORIA -
            </span>
            <span v-else-if="cw">
                - SELEZIONA UNA CW -
            </span>
        </option>
        <template v-for="map,i in maps" :key="i">
          <option :value="i"> {{ i }} </option>
        </template>
      </select>
    </div>
    <div
        v-if="selectedMap"
        class="flex-col flex gap-6 text-white py-6 container mx-auto"
    >
      <div v-for="(data, j) in selectedMap" :key="j+1000">
        <cod-element :data="data" />
      </div>
    </div>
  </section>
</template>


<script>
// @ is an alias to /src
import axios from 'axios';
import { API_GETSTRATS_URL } from '/config.js';
// import ImageGallery from '@/components/ImagesGallery';
import ErrorComponent from '@/components/ErrorComponent';
import CodElement from "@/components/CodElement";

export default {
  name: 'HomeView',
  components: {
    CodElement,
    // ImageGallery,
    ErrorComponent,
  },
  data() {
    return {
      categorie: [],
      maps: [],
      strats: [],
      maxPerPagina: 12,
      pagina: 0,
      errorMsg: '',
      selectedCategoria: '',
      selectedMap: [],
    };
  },
  methods: {
    handleCategorie(categoria) {
        this.selectedMap = [];
        this.selectedCategoria = categoria;
        this.maps = this.strats[categoria];
        this.$nextTick(() => {
            if (this.$refs.mapSelect) {
                this.$refs.mapSelect.value = '';
            }
        });
    },
    handleData(map) {
        this.selectedMap = [];
        this.maps[map].forEach((element) => {
        this.selectedMap.push({
          'titolo': element.titolo,
          'descrizione': element.descrizione,
          'foto': element.foto,
          'id': element.id,
          'categoria': element.categoria
        });
      })
    },
    capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },
    // Funzione per effettuare la chiamata API
    async fetchData() {
      try {
        // Esegui la chiamata API utilizzando axios
        const response = await axios.get(API_GETSTRATS_URL);

        this.categorie = Object.keys(response.data);
        this.strats = response.data;

        this.$store.commit('setLoading', false);
      } catch (error) {
        this.errorMsg = 'Si è verificato un errore, contattare l\'amministratore. Errore: ' + error;
        this.$store.commit('setLoading', false);
      }
    },
    setDocumentTitle() {
      document.title = 'xFoW Raven';
    },

    async loadData() {
      this.categorie = [];
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

<style lang="scss" scoped>
</style>
