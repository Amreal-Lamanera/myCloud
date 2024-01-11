<template>
  <div class="py-6">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-4 p-4">
      <image-gallery :images="srcs" />
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
          @click="(pagina === 0) ? '': pagina--"
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
          @click="((maxPerPagina * (pagina + 1)) > (srcImgsList.length - 1)) ? '' : pagina++"
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
  import { API_GETIMGS_URL, API_DELETEIMG_URL, API_CHECKLOGGED_URL, AMBIENTE } from '/config.js';
  import ImageGallery from '@/components/ImagesGallery.vue';

  export default {
    name: 'HomeView',
    components: {
      ImageGallery
    },
    data() {
      return {
        srcImgsList: [],
        maxPerPagina: 12,
        pagina: 0
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
      }
    },
    methods: {
      async checkLogged() {
        try {
          // Esegui la chiamata API utilizzando axios
          const response = await axios.get(API_CHECKLOGGED_URL);
          console.log(response);

          // in prod se non risulta utente loggato rimando al c-panel
          if (AMBIENTE === "PROD") {
            if (!response.data.logged) {
              window.location.href = '../index.php';
            }
          }
        } catch (error) {
          console.error('Errore durante la chiamata API:', error);
        }
      },
      // Funzione per effettuare la chiamata API
      async fetchData() {
        try {
          // Esegui la chiamata API utilizzando axios
          const response = await axios.get(API_GETIMGS_URL);
          console.log(response);
          
          // Salva i dati ottenuti dalla chiamata nell'oggetto 'srcImgsList'
          this.srcImgsList = response.data;
          console.log(this.srcImgsList);
        } catch (error) {
          console.error('Errore durante la chiamata API:', error);
        }
      },
      deleteFile(filename) {
        const options = {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        };

        axios.post(API_DELETEIMG_URL, {
          filename: filename,
        }, options)
        .then(function (response) {
          console.log(response);
          window.location.reload(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      downloadImage(link) {
        const imageUrl = link;
        console.log(imageUrl);

        // Usa fetch per ottenere i dati dell'immagine
        fetch(imageUrl)
          .then(response => response.blob())
          .then(blob => {
            // Crea un oggetto URL per il blob
            const url = window.URL.createObjectURL(blob);

            // Crea un elemento <a> per il download
            const a = document.createElement('a');
            a.href = url;
            // Specifica il nome del file da scaricare
            let nomeImg = link.split('/');
            nomeImg = nomeImg[(nomeImg.length - 1)];
            a.download = nomeImg;

            // Aggiungi l'elemento <a> al documento
            document.body.appendChild(a);

            // Simula un clic sull'elemento <a> per avviare il download
            a.click();

            // Rimuovi l'elemento <a> dal documento
            document.body.removeChild(a);

            // Rilascia l'URL dell'oggetto blob
            window.URL.revokeObjectURL(url);
          })
          .catch(error => console.error('Errore durante il download dell\'immagine:', error));
      },
      setDocumentTitle() {
        document.title = 'myCloud - Home';
      },

      async loadData() {
        await this.checkLogged();
        this.fetchData();
      },
    },
    mounted() {
      this.setDocumentTitle();
      this.loadData();
    },
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
