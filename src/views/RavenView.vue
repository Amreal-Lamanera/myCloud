<template>
  <section class="px-4">
    <error-component :errorMsg="errorMsg" />
    <div class="container mx-auto">
      <select name="maps" id="maps" class="w-full p-4 bg-slate-700 text-white text-xl"
              @change="handleContent($event.target.value)">
        <option value="" selected disabled>
          - SELEZIONA UNA MAPPA -
        </option>
        <template v-for="map,i in maps" :key="i">
          <option :value="map"> {{ map }} </option>
        </template>
      </select>
    </div>
    <div
        v-if="selectedData.length > 0"
        class="flex-col flex gap-6 text-white py-6 container mx-auto"
    >
      <div v-for="(data, j) in selectedData" :key="j+1000">
        <strat-element :data="data" />
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
import StratElement from "@/components/StratElement";

export default {
  name: 'HomeView',
  components: {
    StratElement,
    // ImageGallery,
    ErrorComponent,
  },
  props: {
  },
  data() {
    return {
      maps: [],
      strats: [],
      maxPerPagina: 12,
      pagina: 0,
      errorMsg: '',
      selectedData:[],
    };
  },
  methods: {
    handleContent(map) {
      this.selectedData = [];
      this.strats[map].forEach((element) => {
        this.selectedData.push({
          'titolo': element.titolo,
          'descrizione': element.descrizione,
          'foto': element.foto,
          'id': element.id,
        });
      })
    },
    // Funzione per effettuare la chiamata API
    async fetchData() {
      try {
        // Esegui la chiamata API utilizzando axios
        const response = await axios.get(API_GETSTRATS_URL);

        this.maps = Object.keys(response.data);
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
      this.maps = [];
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
