<template>
    <header class="bg-slate-900">
        <nav class="px-5">
            <div class="mx-auto px-2 md:px-6 xl:px-8">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="absolute inset-y-0 right-0 flex items-center xl:hidden">
                        <!-- Mobile menu button-->
                        <button type="button" class="bordizza inline-flex items-center justify-center sm:rounded-md p-2 text-white hover:bg-slate-600  hover:text-white rounded-full border-sky-700 relative" aria-controls="mobile-menu"
                            aria-expanded="false" id="menu-button" @click.stop="handleBurgerMenuClick" ref="burgerIcon">
                            <div class="my_arrow" ref='my_arrow'>
                                <i class="fa-solid fa-arrow-right fa-beat"></i>
                            </div>
                            <span class="sr-only">Open main menu</span>
                            
                            <svg class="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        
                        </button>
                    </div>
                    <div class="flex flex-1 items-center justify-start xl:justify-between" ref="menu">
                        <a href="/my_site" title="Visita la Homepage" id="logo">
                            <img src="https://www.francescopieraccini.it/my_site/src/img/loghi/light-blue.svg" alt="Logo">
                        </a>
                        <div class="hidden xl:ml-6 xl:block">
                            <div class="flex space-x-4">
                                <router-link @click="pochita('home')" :to="{ name: 'home'}">
                                    Homepage
                                </router-link>
                                <router-link @click="pochita('LeTueFoto')" :to="{ name: 'LeTueFoto'}">
                                    Le foto di: {{ username }}
                                </router-link>
                                <span v-if="superuser">
                                    <router-link @click="pochita('all')" :to="{ name: 'all'}">
                                    Tutte le foto
                                    </router-link>
                                </span>
                                <router-link @click="pochita('public')" :to="{ name: 'public'}">
                                    Foto pubbliche
                                </router-link>
                                <router-link @click="pochita('upload')" :to="{ name: 'upload'}">
                                    Upload
                                </router-link>
                                <a href="../" title="Vai alla homepage di francescopieraccini.it">
                                    francescopieraccini.it
                                </a>
                                <a href="#" title="Effettua il logout" @click="logout" class="cursor-pointer">
                                    Logout
                                </a>
                                <span v-if="superuser">
                                    <a v-if="superuser" :href="cpanel_url" title="Vai al pannello di controllo">
                                        C-panel
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div class="bg-slate-700 rounded xl:hidden" v-if="is_burger_open" id="mobile-menu">
                <div 
                    class="
                        space-y-1 
                        px-2 py-6 
                        text-right 
                    "
                >
                    
                    <ul 
                        class="
                            flex 
                            flex-col 
                            gap-2
                            text-xl
                        "
                    >
                        <li>
                            <router-link @click="pochita('home')" :to="{ name: 'home'}">
                                Homepage
                            </router-link>
                        </li>
                        <li>
                            <router-link @click="pochita('LeTueFoto')" :to="{ name: 'LeTueFoto'}">
                                Le foto di: {{ username }}
                            </router-link>
                        </li>
                        <li>
                            <span v-if="superuser">
                                <router-link @click="pochita('all')" :to="{ name: 'all'}">
                                    Tutte le foto
                                </router-link>
                            </span>
                        </li>
                        <li>
                            <router-link @click="pochita('public')" :to="{ name: 'public'}">
                                Foto pubbliche
                            </router-link>
                        </li>
                        <li>
                            <router-link @click="pochita('upload')" :to="{ name: 'upload'}">
                                Upload
                            </router-link>
                        </li>
                        <li>
                            <a href="../" title="Vai alla homepage di francescopieraccini.it">
                                francescopieraccini.it
                            </a>
                        </li>
                        <li>
                            <a href="#" title="Effettua il logout" @click="logout" class="cursor-pointer">
                                Logout
                            </a>
                        </li>
                        <li>
                            <span v-if="superuser">
                            
                                <a v-if="superuser" :href="cpanel_url" title="Vai alpannello di controllo">
                                    C-panel
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    import axios from 'axios';
    import Store from '@/store/index';
    import { API_LOGOUT_URL, CPANEL_URL } from '/config.js';

    export default {
        data() {
            return {
                cpanel_url: CPANEL_URL,
                is_burger_open: false,
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
            handleBurgerMenuClick() {
                this.is_burger_open = !this.is_burger_open;
                this.$refs.burgerIcon.classList.remove('bordizza');
                this.$refs.my_arrow.classList.add('hidden');
            },
            handleClickOutside(event) {
                // Verifica se l'elemento cliccato è al di fuori del div target
                const menu = this.$refs.menu;
                if (menu && !menu.contains(event.target)) {
                this.is_burger_open = false;
                // Aggiungi il tuo codice di gestione qui
                }
            },
            pochita(page) {
                if (page !== this.$route.name) {
                  Store.commit('setLoading', true);
                }
            }
        },
        mounted() {
            // Aggiungi un listener all'oggetto document
            document.addEventListener('click', this.handleClickOutside);
        },
        beforeUnmount() {
            // Rimuovi il listener quando il componente viene distrutto per evitare memory leaks
            document.removeEventListener('click', this.handleClickOutside);
        },
    }

</script>

<style lang="scss" scoped>


header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
    border-bottom: 1px solid #c1c1c1;
    
    nav {
        padding: 30px;
    
        a {
          font-weight: bold;
          color: #cccccc;
    
          &:hover, 
          &.router-link-exact-active 
          {
            color: #42b983;
          }
        }
    }
}

    #logo {
        font-family: 'Dancing Script', cursive;
        width: 4rem;
        height: 4rem;
        color: #000;
    }

    .my_arrow {
        position: absolute;
        left: -3rem;
        font-size: 2rem;
        animation: showArrow 1.5s linear 2;
        animation-delay: 5s;
        opacity: 0;
    }

    .my_arrow .fa-arrow-right {
        color: #c1c1c1;
    }

    @keyframes showArrow {

        0% {
            opacity: 1;
        }

        100% {
            opacity: 1;
        }

    }

    #menu-button {
        border: 4px solid transparent;
    }

    .bordizza {
        animation: bordizza 1.5s linear 2;
        animation-delay: 5s;
    }

    @keyframes bordizza {

        0% {
            border: 4px solid transparent;
        }

        20% {
            border-bottom-color: #c1c1c1;
        }

        40% {
            border-right-color: #c1c1c1;
        }

        50% {
            border-top-color: #c1c1c1;
        }

        80% {
            border-left-color: #c1c1c1;
        }

        100% {
            border-color: transparent;
        }

    }

</style>