<template>
    <footer class="text-white flex justify-center">
        <div class="container md:flex justify-between items-center">
            <div class="copy text-xs text-center pb-3 lg:p-0 flex items-center justify-center">
                Copyright &copy; 2022-2024
                <a title="Visita francescopieraccini.it" class="flex flex-col items-center"
                    href="https://www.francescopieraccini.it/" id="logo-link"
                    aria-label="Home Page di francescopieraccini.it">
                    <img class="block" src="https://www.francescopieraccini.it/my_site/src/img/loghi/light-blue.svg"
                        alt="Logo" id="logo-img">
                    <small id="nome_logo">Francesco Pieraccini</small>
                </a>
                . All Rights Reserved
            </div>
            <div class="socials flex gap-2 justify-center">
                <a href="https://www.linkedin.com/in/francescopieraccini/"
                    class="logo custom bg-white rounded-full flex justify-center items-center"
                    aria-label="Visita il profilo linkedin di Francesco Pieraccini"
                    title="Visita il profilo linkedin di Francesco Pieraccini">
                    <i class="fa-brands fa-linkedin-in text-slate-900"></i>
                </a>
                <a href="https://github.com/Amreal-Lamanera/"
                    class="logo custom rounded-full flex justify-center items-center"
                    aria-label="Visita il profilo GitHub di Francesco Pieraccini"
                    title="Visita il profilo GitHub di Francesco Pieraccini">
                    <i class="fa-brands fa-github text-white"></i>
                </a>
                <a href="mailto: pieraccini.francesco@gmail.com"
                    class="logo custom bg-white rounded-full flex justify-center items-center"
                    aria-label="Invia un'email all'indirizzo di posta di Francesco Pieraccini"
                    title="Invia un'email all'indirizzo di posta di Francesco Pieraccini">
                    <i class="fa-solid fa-envelope text-slate-900"></i>
                </a>
                <a href="https://www.francescopieraccini.it/my_site/src/CV.pdf" download="CV"
                    class="logo custom bg-white rounded-full flex justify-center items-center"
                    aria-label="Scarica il curriculum vitae di Francesco Pieraccini"
                    title="Scarica il curriculum vitae di Francesco Pieraccini">
                    <span class="text-slate-900 font-bold">CV</span>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>

    export default {
        name: 'MainFooter',
    }

</script>

<style>
    footer {
        padding: 1rem 0;
        border-top: 1px solid rgb(63 63 70);
    }

    .fa-github {
        font-size: 1.5rem;
    }

    .custom {
        width: 1.5rem;
        height: 1.5rem;
    }

    #logo-img {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
    }

    small {
        font-size: 0.5rem;
    }

    #logo-link:hover {
        transform: scale(1.3);
        text-decoration: underline;
    }
</style>