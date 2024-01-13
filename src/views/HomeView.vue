<template>
  <section class="container flex flex-col justify-center items-center text-white mx-auto py-16" id="header-section">
            <div class="flex items-center">
                <h1 class="text-7xl sm:text-9xl">
                    CIAO!
                </h1>
                <span class="text-7xl sm:text-9xl saluta">&#9995;</span>
            </div>
            <div class="pt-12">
                <h2 class="text-3xl sm:text-5xl text-center">
                    <span>Benvenutǝ nel progetto "myCloud"</span>
                </h2>
            </div>
            <div class="pt-12">
                <p class="text-center text-xl pb-16">
                  E' ancora in fase di <strong class="text-red-600">test</strong> per cui si potrebbero verificare degli errori. Se dovesse succedere ti sarei gratǝ se mi <a href="../contactMe.php" class="text-purple-600 hover:underline hover:text-purple-400">contattassi</a> per segnalare il problema! 🙏🏻 <br>
                  Inoltre questo progetto subirà spesso variazioni per cui potrebbe essere necessario cancellare i dati di navigazione in caso di blocco.<br><br>
                  In ogni caso, naviga pure in libertà, puoi provare tutto senza timore, ma ti consiglio di non caricare foto compromettenti perché io vedo tutto! 👀 E se usi un <strong class="text-red-600"> "ProfiloPubblico" </strong> ovviamente anche altri utenti vedranno le tue foto come se fossero loro.
                </p>
                <h2 class="text-5xl sm:text-7xl pb-6">
                  Come funziona?
                </h2>
                <p class="text-left pb-2">
                  Naviga tra le pagine tramite il menù di navigazione in alto e potrai trovare:
                </p>
                <ul class="list-disc text-left">
                  <li>
                    <strong style="color: #42b983;"> Homepage </strong> - questa pagina.
                  </li>
                  <li>
                    <strong style="color: #42b983;"> Le foto di: {{ username }} </strong> - la galleria delle foto private caricate con questa username.
                  </li>
                  <li>
                    <strong style="color: #42b983;"> Foto pubbliche </strong> - tutte le foto che gli utenti hanno caricato come pubbliche.
                  </li>
                  <li>
                    <strong style="color: #42b983;"> Upload </strong> - la sezione dove poter caricare le foto.
                  </li>
                  <li>
                    <strong style="color: #42b983;"> francescopieraccini.it </strong> - il collegamento alla homepage del mio sito.
                  </li>
                  <li>
                    <strong style="color: #42b983;"> Logout </strong> - da cliccare per effettuare logout.
                  </li>
                </ul>
            </div>
        </section>
</template>

<script>
import Store from '@/store/index';
import { API_INSERTIMG_URL } from '/config.js';

  export default {
    data() {
      return {
        insert_url: null,
      }
    },
    computed: {
      username() {
        return Store.state.username;
      }
    },
    mounted() {
      document.title = 'myCloud - Upload';
      this.insert_url = API_INSERTIMG_URL;
    },
    beforeMount() {
      if (this.$route.query.error) {
        console.log(this.$route.query.error);
        Store.commit('setError', this.$route.query.error);
      }
      if (this.$route.query.redirect) {
        this.$router.replace({ name: this.$route.query.redirect });
      }
    }
  }
</script>

<style>
  .saluta {
      animation:
          saluta 1.5s linear 0s forwards 2;

  }

  @keyframes saluta {
      0% {
          transform: rotate(-60deg);
      }

      25% {
          transform: rotate(0deg);
      }

      50% {
          transform: rotate(-60deg);
      }

      75% {
          transform: rotate(0deg);
      }

      100% {
          transform: rotate(-60deg);
      }
  }
</style>
