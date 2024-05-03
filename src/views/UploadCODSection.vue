<template>
    <section class="upload flex justify-center items-center h-full container p-4 max-w-xl mx-auto">
        <div class="w-full bg-slate-700 rounded-lg shadow-lg overflow-hidden">
            <form :action="insert_url" method="POST" enctype="multipart/form-data"
                class="p-14 text-xs sm:text-base text-white flex flex-col gap-3" ref="form_upload">
                <label for="categoria">
                        Categoria:
                </label>
                <select v-model="editData.categoria" name="categoria" id="categoria" class="w-full p-2 bg-slate-400 text-black rounded-lg" @input="updateSelectedCat">
                    <option value="" disabled>- SELEZIONA CATEGORIA -</option>
                    <option value="classi">Classi</option>
                    <option value="cw">CW</option>
                    <option value="mappe">Mappe</option>
                </select>
                <div class="flex flex-col gap-3" id="map_container" v-if="selectedCategoria">
                    <label for="map" v-if="selectedCategoria === 'mappe'">
                        Mappa:
                    </label>
                    <label for="map" v-else-if="selectedCategoria === 'cw'">
                        Team:
                    </label>
                    <label for="map" v-else-if="selectedCategoria === 'classi'">
                        Sezione classi:
                    </label>
                    <select name="map" id="map" required @input="updateSelectedValues" v-model="selectedOption"
                        class="w-full p-2 bg-slate-400 text-black rounded-lg">
                        <option value="" selected disabled v-if="selectedCategoria === 'mappe'">
                            - SELEZIONA LA MAPPA -
                        </option>
                        <option value="" selected disabled v-else-if="selectedCategoria === 'cw'">
                            - SELEZIONA IL TEAM -
                        </option>
                        <option value="" selected disabled v-else-if="selectedCategoria === 'classi'">
                            - SELEZIONA LA SEZIONE -
                        </option>
                        <option v-for="map, i in sezioneOptions" :key="i" :value="map.mappa" :data-categoria="map.categoria">
                            {{ map.mappa }}
                        </option>
                        <option value="new" data-categoria="new" v-if="selectedCategoria"> * NUOVA * </option>
                    </select>
                    <input type="text" id="map-new" name="map-new" :class="selectedOption !== 'new' ? 'hidden' : ''" 
                        :placeholder="selectedCategoria === 'mappe' ? 'Inserisci il nome della mappa' : 
                        selectedCategoria === 'cw' ? 'Inserisci il nome del team' :
                        selectedCategoria === 'classi' ? 'Inserisci il nome della sezione' :
                        ''"
                    />
                </div>
                <div class="flex flex-col gap-3" id="title_container">
                    <label for="title">
                        Titolo:
                    </label>
                    <input type="text" id="title" name="title" required :value="editData.titolo">
                </div>
                <div class="flex flex-col gap-3" id="ph_container">
                    <label for="ph">
                        Foto:
                    </label>
                    <input id="ph" name="file_to_upload[]" required
                        class="cursor-pointer text-white form-input w-full bg-blue-600 rounded-full" type="file"
                        ref="files">
                    <span class="hidden text-red-700 font-bold" ref="filesError">
                        Seleziona almeno un file!
                    </span>
                  <div v-if="editData.foto">
                    <p>Foto Attuale: </p>
                    <img :src="`${imgs_dir}cod/${editData.foto}`" />
                  </div>
                </div>
                <div class="flex flex-col gap-3" id="descrizione-container">
                    <label for="descrizione">
                        Descrizione:
                    </label>
                    <textarea name="descrizione" id="descrizione" cols="30" rows="10"  v-model="editData.descrizione"></textarea>
                </div>
                <div class="text-center">
                    <input type="submit" value="CARICA"
                        class="btn cursor-pointer text-white mt-2 bg-blue-600 p-3 border border-white rounded-full hover:bg-blue-950"
                        @click="upload">
                </div>
              <div v-if="editData.id">
                <input type="hidden" name="id" :value="editData.id" />
              </div>
            </form>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import {API_INSERT_COD_URL, API_GETMAPS_URL, API_GETSTRATS_URL, IMGS_DIR} from '/config.js';

export default {
    data() {
        return {
            insert_url: API_INSERT_COD_URL,
            selectedOption: '',
            selectedCategoria: '',
            mapsFromDB: [],
            editData: [],
        }
    },
    computed: {
        sezioneOptions() {
            let options = [];
            if (this.selectedCategoria) {
                this.mapsFromDB.forEach(element => {
                    if (element.categoria === this.selectedCategoria) {
                        options.push(element);
                    }
                });
            }
            return options;
        },
      imgs_dir() {
          return IMGS_DIR;
      }
    },
    methods: {
        async fetchData() {
            try {
                // Esegui la chiamata API utilizzando axios
                const response = await axios.get(API_GETMAPS_URL);

                this.mapsFromDB = response.data;
                console.log(this.mapsFromDB);
                this.$store.commit('setLoading', false);
            } catch (error) {
                this.errorMsg = 'Si è verificato un errore, contattare l\'amministratore. Errore: ' + error;
                this.$store.commit('setLoading', false);
            }
        },
        // Funzione per effettuare la chiamata API
        async fetchDataEdit(id) {
          try {
            // Esegui la chiamata API utilizzando axios
            const response = await axios.get(API_GETSTRATS_URL + '?id=' + id);

            this.$store.commit('setLoading', false);

            console.log('AIOO')
            console.log(response.data[0]);

            this.editData = response.data[0];
            this.selectedCategoria = this.editData.categoria;
            this.selectedOption = this.editData.mappa;
          } catch (error) {
            this.errorMsg = 'Si è verificato un errore, contattare l\'amministratore. Errore: ' + error;
            this.$store.commit('setLoading', false);
          }
        },
        updateSelectedCat(event) {
            this.selectedCategoria = '';
            this.selectedOption = '';
            this.selectedCategoria = event.target.value;
        },
        upload(event) {
            const form = this.$refs.form_upload;
            const files = this.$refs.files;
            const filesError = this.$refs.filesError;
            event.preventDefault();
            if (!this.editData) {
              if (!files.files.length) {
                files.classList.add('border-red-600', 'border-2');
                filesError.classList.remove('hidden');
                return;
              }
            }
            this.$store.commit('setLoading', true);
            form.submit();
        },
    },
    mounted() {
        this.$store.commit('setLoading', false);
        document.title = 'myCloud - Upload';
        this.mapsFromDB = [];
        this.fetchData();
        if (this.$route.params.id) {
          this.fetchDataEdit(this.$route.params.id);
        }
    },
}
</script>

<style lang="scss" scoped>
label {
    text-align: left;
}

input[type='text'],
textarea {
    color: black;
}

option {
    padding: 1rem;
}
</style>
