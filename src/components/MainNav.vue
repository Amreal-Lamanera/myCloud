<template>
    <nav>
        <router-link :to="{ name: 'home'}">
            Homepage
        </router-link> |
        <router-link :to="{ name: 'LeTueFoto'}">
            Le foto di: {{ username }}
        </router-link> |
        <span v-if="superuser">
            <router-link :to="{ name: 'all'}">
            Tutte le foto
            </router-link> |
        </span>
        <router-link :to="{ name: 'public'}">
            Foto pubbliche
        </router-link> |
        <router-link to="/upload">
            Upload
        </router-link> |
        <a href="../" title="Vai alla homepage di francescopieraccini.it">
            francescopieraccini.it
        </a> |
        <a href="#" title="Effettua il logout" @click="logout" class="cursor-pointer">
            Logout
        </a>
        <span v-if="superuser">
            |
            <a v-if="superuser" :href="cpanel_url" title="Vai al pannello di controllo">
                C-panel
            </a>
        </span>
    </nav>
</template>

<script>
    import axios from 'axios';
    import Store from '@/store/index';
    import { API_LOGOUT_URL, CPANEL_URL } from '/config.js';

    export default {
        data() {
            return {
                cpanel_url: CPANEL_URL,
            }
        },
        computed: {
            logged() {
                return Store.state.logged;
            },
            superuser() {
                return Store.state.superuser;
            },
            username() {
                return Store.state.username;
            },
        },
        methods: {
            async logout() {
                try {
                    // Esegui la chiamata API per il logout
                    const response = await axios.get(API_LOGOUT_URL);

                    if(response.data) {
                        window.location.href = '../login/login.php';
                    } else {
                        this.errorMsg = "Qualcosa è andato storto! Contattare l'amministratore";
                    }
                } catch (error) {
                    this.errorMsg = 'Si è verificato un errore, contattare l\'amministratore. Errore: ' + error;
                }
            },
        },
    }

</script>