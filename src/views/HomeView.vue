<template>
  <section class="container flex flex-col justify-center items-center text-white mx-auto px-6" id="header-section">
            <div class="flex items-center">
                <h1 class="text-7xl sm:text-9xl">
                    CIAO!
                </h1>
                <span class="text-7xl sm:text-9xl saluta">&#9995;</span>
            </div>
            <div class="pt-12">
              <div class="pb-16">
                <h2 class="text-5xl sm:text-7xl-5xl text-center pb-6">
                    <span>Benvenutǝ nel progetto "myCloud"</span>
                </h2>
                <p class="text-center text-xl">
                  E' ancora in fase di <strong class="text-red-600">test</strong> per cui si potrebbero verificare degli errori. Se dovesse succedere ti sarei gratǝ se mi <a href="../contactMe.php" class="text-purple-600 hover:underline hover:text-purple-400">contattassi</a> per segnalare il problema! 🙏🏻 <br>
                  Inoltre questo progetto subirà spesso variazioni per cui potrebbe essere necessario cancellare i dati di navigazione in caso di blocco.<br><br>
                  In ogni caso, naviga pure in libertà, puoi provare tutto senza timore, ma ti consiglio di non caricare foto compromettenti perché io vedo tutto! 👀 E se usi un <strong class="text-red-600"> "ProfiloPubblico" </strong> ovviamente anche altri utenti vedranno le tue foto come se fossero loro.
                </p>
              </div>

              <div class="text-xl flex flex-col items-center pb-16">
                <h3 class="text-3xl sm:text pb-6">
                  Come funziona?
                </h3>
                <p class="text-left pb-2">
                  Naviga tra le pagine tramite il menù di navigazione in alto e potrai trovare:
                </p>
                <ul class="list-disc text-left">
                  <li>
                    <router-link :to="{ name: 'home'}" style="color: #42b983;" class="font-bold hover:underline"> Homepage </router-link> - questa pagina.
                  </li>
                  <li>
                    <router-link :to="{ name: 'LeTueFoto'}" style="color: #42b983;" class="font-bold hover:underline"> Le foto di: {{ username }} </router-link> - la galleria delle foto private caricate con questa username.
                  </li>
                  <li>
                    <router-link :to="{ name: 'public'}" style="color: #42b983;" class="font-bold hover:underline"> Foto pubbliche </router-link> - tutte le foto che gli utenti hanno caricato come pubbliche.
                  </li>
                  <li>
                    <router-link to="/upload" style="color: #42b983;" class="font-bold hover:underline"> Upload </router-link> - la sezione dove poter caricare le foto.
                  </li>
                  <li>
                    <a href="../" style="color: #42b983;" class="font-bold hover:underline"> francescopieraccini.it </a> - il collegamento alla homepage del mio sito.
                  </li>
                  <li>
                    <strong style="color: #42b983;"> Logout </strong> - da cliccare per effettuare logout.
                  </li>
                </ul>
              </div>
              
              <div class="text-xl flex flex-col items-center">
                <h3 class="text-3xl sm:text pb-6">
                  Qual è lo scopo di tutto ciò?
                </h3>
                <p class="text-left pb-2">
                  <strong class="text-red-600"> Premessa: </strong> vorrei che questo testo fosse per tutti, non solo per chi parla "programmese", ma mi rendo conto che potrebbe non esserlo. <br>
                  Per tutti voi un bel <strong class="text-red-600"> riassuntino</strong>: volevo esercitarmi nel programmare con un determinato linguaggio ed è venuto fuori un progetto che mi ha soddisfatto, così ho voluto pubblicarlo/condividerlo!
                  <br><br>
                  Era da un po' che non utilizzavo Vue ed ero curioso di mettere mano alla versione 3, visto che io inizialmente avevo studiato il 2. Per cui mi sono visto un video e ho iniziato il setup del progetto e ho pensato "ma cosa faccio?". <br>
                  Tempo fa prima di addormentarmi avevo ragionato su un sito "archivio foto" per me, per mettere le mie foto e poterle scaricare su diversi dispositivi; mi è tornata in mente questa cosa e ho iniziato a buttar giù codice! <br>
                  Mano a mano che il sito si concretizzava davanti ai miei occhi mi sono reso conto che mi stava piacendo, al punto dal volerlo mostrare a chiunque passasse dal mio sito! Ma c'erano dei problemi: inizialmente era strutturato per funzionare all'interno del mio control-panel (con cui gestisco la sezione <a href="/my_site/myPortfolio.php" class="text-purple-600 hover:underline hover:text-purple-400">Portfolio</a> del sito principale) e non avrei potuto condividere il link al pubblico, altrimenti avrei rischiato di trovare le peggio cose su tale sezione... Inoltre pure la login era gestita per funzionare solo per me ed era all'interno sempre del c-panel. Per cui ho dovuto lavorare parallelamente ancora sul progetto my_site (il <a href="/my_site" class="text-purple-600 hover:underline hover:text-purple-400">mio sito</a> appunto) e revisionare e fare refactoring di "tutto quello che c'è dietro" (il backend). <br>
                  Poi per gestire tutte le funzionalità del myCloud ho dovuto in ogni caso dedicarmi molto alla costruzione di api, sempre chiamando il c-panel. <br>
                  Insomma, volevo provare Vue3, ma alla fine ho fatto un <strong class="text-red-600"> sacco </strong> di lavoro anche sul mio sito (sempre roba di backend) e sono tornato sul solito PHP. <br>
                  Per concludere: ho ripassato Vue e imparato qualcosa di nuovo sulla versione 3, mi sono esercitato su PHP, in particolare, sulla creazione di API (che male non fa) ed è venuta fuori questa sezione del sito/progetto. Spero pure mi sarà utile e che magari possa essere utile anche ad altri!
                </p>
              </div>
            </div>
        </section>
</template>

<script>
import { API_INSERTIMG_URL } from '/config.js';

  export default {
    data() {
      return {
        insert_url: null,
      }
    },
    computed: {
      username() {
        return this.$store.state.username;
      }
    },
    mounted() {
      document.title = 'myCloud - Upload';
      this.insert_url = API_INSERTIMG_URL;
      setTimeout(() => {this.$store.commit('setLoading', false);}, 500);
    },
    beforeMount() {
      this.$store.commit('setLoading', true);
      if (this.$route.query.error) {
        this.$store.commit('setError', this.$route.query.error);
      }
      if (this.$route.query.redirect) {
        this.$router.replace({ name: this.$route.query.redirect });
      }
      if (this.$store.state.redirect) {
        const redirect = this.$store.state.redirect;
        this.$store.commit('setRedirect', '');
        this.$router.replace({ name: redirect });
      }
    }
  }
</script>

<style scoped>

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
