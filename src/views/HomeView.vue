<template>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-4 p-4" v-if="responseData !== null">
      <div class="relative" v-for="(src, key) in responseData" :key="key">
        <img
          loading="lazy"
          title="Click per download" 
          class="cursor-pointer"  
          :src="'./cloudImgs/' + src" 
          alt="" 
          @mouseover="showKey = key"
          @mouseout="showKey = null"
        >
        <div 
          class="layover" 
          :class="showKey === key ? 'flex' : 'hidden'" 
          @mousemove="showKey = key" 
          @mouseleave="showKey = null"
          @click="downloadImage('./cloudImgs/' + src)"
        >
          <input type="hidden" name="file" value="<?= $file ?>">
          <input name="table" type="hidden" value="<?= $table ?>">
          <div class="text-white font-bold cursor-pointer bg-blue-900 border-white border-2 p-3">
              CLICK PER DOWNLOAD
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios';

  export default {
    name: 'HomeView',
    components: {
    },
    data() {
      return {
        responseData: null,
        showKey: null
      };
    },
    methods: {
      async checkLogged() {
        try {
          // Esegui la chiamata API utilizzando axios
          // TODO:
          // LOCALE:
          // const response = await axios.get('http://francescopieraccini.localhost/admin/c-panel/apis/checkLogged.php');
          // ONLINE
          const response = await axios.get('../apis/checkLogged.php');
          console.log(response);

          // Salva i dati ottenuti dalla chiamata nell'oggetto 'responseData'
          // this.responseData = response.data;
          console.log(response.data);
          if (!response.data.logged) {
            window.location.href = '../index.php';
          }
        } catch (error) {
          console.error('Errore durante la chiamata API:', error);
        }
      },
      // Funzione per effettuare la chiamata API
      async fetchData() {
        try {
          // Esegui la chiamata API utilizzando axios
          // TODO:
          // LOCALE:
          // const response = await axios.get('http://francescopieraccini.localhost/admin/c-panel/apis/getAllImgsFromCloud.php');
          // ONLINE
          const response = await axios.get('../apis/getAllImgsFromCloud.php');
          console.log(response);
          
          // Salva i dati ottenuti dalla chiamata nell'oggetto 'responseData'
          this.responseData = response.data;
          console.log(this.responseData);
        } catch (error) {
          console.error('Errore durante la chiamata API:', error);
        }
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
      async setDocumentTitle() {
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

<style>
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

.layover img {
    filter: invert(1);
}
</style>
