// Ventana modal Menú

    // Variables
    const btn_hamburguesa = document.querySelector(".js-toggle-menu-dropdown");
    const menu_desplegable = document.querySelector(".js-menu-dropdown");
    const menu_link = document.querySelector(".js-menu-dropdown-nav");

    // Eventos
    btn_hamburguesa.addEventListener("click", () => {
        menu_desplegable.classList.toggle("is-active");
        btn_hamburguesa.classList.toggle("is-active");
    });

    menu_link.addEventListener("click", () => {
      menu_desplegable.classList.remove("is-active");
      btn_hamburguesa.classList.remove("is-active");
  });
 

// Reloj y Alarma

  // Variables

    const start_watch = document.querySelector(".js-start-watch");
    const stop_watch = document.querySelector(".js-stop-watch");

    const start_alarm = document.querySelector(".js-start-alarm");
    const stop_alarm = document.querySelector(".js-stop-alarm");

    let watch_alarm_screen = document.querySelector(".js-watch-alarm-screen");

    // Clock
    let clock_interval = null;
    // Alarm:
    const alarm = document.createElement("audio");
    alarm.src = "assets/sound/alarm.mp3";
    let duration;

  // Eventos

    start_watch.addEventListener("click", () => {

        start_watch.disabled = true;
        start_watch.classList.add('is-opacity_50');
    
        clock_interval = setInterval(() =>{
            let clock = new Date().toLocaleTimeString();
            watch_alarm_screen.value = clock + '   ' + mostrarFecha();
        }, 1000);

    });

    stop_watch.addEventListener("click", () => {
        start_watch.disabled = false;
        start_watch.classList.remove('is-opacity_50');
        watch_alarm_screen.value = '';
        clearInterval(clock_interval);
    });

    start_alarm.addEventListener("click", () => {
        start_alarm.disabled = true;
        start_alarm.classList.add('is-opacity_50');

        duration = setTimeout(() =>{
            watch_alarm_screen.value = 'Alarma!!!';
            watch_alarm_screen.classList.add('is-parpadea');
            alarm.play();
        }, 1000);

    });

    stop_alarm.addEventListener("click", () => {
        start_alarm.disabled = false;
        start_alarm.classList.remove('is-opacity_50');
        watch_alarm_screen.value = '';
        watch_alarm_screen.classList.remove('is-parpadea');

        clearTimeout(duration);
        alarm.pause();
        alarm.currentTime = 0;
    });

    // Funciones

        function mostrarFecha(){

            let hoy = new Date();
        
            let dia = hoy.getDate();
            dia = dia < 10 ? `0${dia}` : dia;
            let mes = hoy.getMonth() + 1; 
            mes = mes < 10 ? `0${mes}` : mes;
            let anyo = hoy.getFullYear();
        
            let resultadoFecha = `${dia}/${mes}/${anyo}`;

            return resultadoFecha;

            //También se podría obtener la fecha:
            //let date = new Date().toLocaleDateString();
            //Con este método no se pone un 0 delante de números de un único dígito. 
        }

// Eventos Teclado
    // Variables
    let x = 0,
        y = 0;

    // Eventos
    document.addEventListener("keydown", e =>{
        moveBall(e, ".c-key-event__ball", ".c-key-event__stage");

    });
    // Funciones
    function moveBall(e, ball, stage){

        const $ball = document.querySelector(ball);
        const $stage = document.querySelector(stage);

        let limitsBall = $ball.getBoundingClientRect();
        let limitsStage = $stage.getBoundingClientRect();

        switch (e.keyCode) {
            case 37:
                // Izquierda
                if(limitsBall.left > limitsStage.left){
                    e.preventDefault();      
                    if((limitsBall.left - limitsStage.left) > 10) x--;
                } 
                break;
            case 38:
                // Arriba
                if(limitsBall.top > limitsStage.top){
                    e.preventDefault();
                    y--;
                } 
                break;
            case 39:
                // Derecha
                if(limitsBall.right < limitsStage.right){
                    e.preventDefault();  
                    if((limitsStage.right - limitsBall.right) > 10) x++;
                } 
                break;
            case 40:
                // Abajo
                if(limitsBall.bottom < limitsStage.bottom){
                    e.preventDefault();
                    y++;
                } 
                break;
        
            default:
                break;

        }

        $ball.style.transform = `translate(${x*10}px, ${y*10}px)`;
        
    }

// CountDown

    // Variable
    const countDate = document.querySelector('.js-countdown-date');
    const countTime = document.querySelector('.js-countdown-time');

    const countdown_button =  document.querySelector('.js-countdown-button')

    const countdown_form =  document.querySelector('.js-countdown__formulario');

    const countdown =  document.querySelector('.js-countdown');

    // Eventos
    countdown_button.addEventListener("click", function(e){

        e.preventDefault();

        if(countDate.value != '' && countTime.value != ''){

            let completDate = `${countDate.value} ${countTime.value}`;

            let dateValue = new Date(completDate).getTime();

            let currentDate = new Date().getTime();

            countdown_form.classList.add("c-countdown__none");

            const countdown_div = document.createElement("div");
            countdown_div.classList.add("c-countdown__countdown");
            countdown.appendChild(countdown_div);

            if(currentDate > dateValue){
                countdown_div.innerHTML = `<h3 class="c-countdown__date-fail">La fecha que has introducido ya ha pasado, lo siento!!!</h3>`;
            }else{

                let countdown_view = setInterval(() => {

                    currentDate = new Date().getTime();
                    let resultado = dateValue - currentDate;

                    let days = Math.floor(resultado / (1000 * 60 * 60 * 24));
                    let hours = ("0" + Math.floor(resultado % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))).slice(-2);
                    let minutes = ("0" + Math.floor(resultado % (1000 * 60 * 60) / (1000 * 60))).slice(-2);
                    let seconds = ("0" + Math.floor(resultado % (1000 * 60) / (1000))).slice(-2);

                    countdown_div.innerHTML = `<h3>Quedan: ${days} días, ${hours} horas, ${minutes} minutos, 
                                                ${seconds} segundos para llegar a la hora seleccionada.</h3>`;

                    if(resultado < 0){
                        clearInterval(countdown_view);
                        countdown_div.innerHTML = `<h3 class="c-countdown__date-ok">La hora seleccionada ha llegado, enhorabuena!!!</h3>`;
                    }
                }, 1000);
    
            }
        }else{

            const empty_fields = document.createElement("div");
            empty_fields.classList.add("c-countdown__empty-fields");
            countdown.appendChild(empty_fields);
            empty_fields.innerHTML = `<p>Los campos de fecha y hora no pueden quedar vacíos</p>`;

            setTimeout(() =>{
                empty_fields.remove();
            }, 5000);

        }    
         
    });

// Scroll Buttom

    // Variable
    const scrollButtom = document.querySelector('.js-scroll-buttom');

    // Eventos
    window.addEventListener("scroll", () =>{
        let scrollTop = window.pageYOffset;
        if(scrollTop > 320)
            scrollButtom.classList.remove("c-scroll-buttom__hidden");
        else
            scrollButtom.classList.add("c-scroll-buttom__hidden");
    });

    scrollButtom.addEventListener("click", () =>{
        console.log('pulsado');
        window.scrollTo({
            behaivor: "smooth",
            top: 0
        });
    });

// Dark Theme

    // Variable
    const darkButtom = document.querySelector('.js-dark-theme');
    const darkModeAttribute = document.querySelectorAll("[data-dark]");

    const moon = "🌙";
    const sun = "☀️";

    const darkMode = () => {
        darkModeAttribute.forEach((element) => {
            if(element.classList.contains("c-key-event__stage"))
                element.classList.add("c-key-event__dark-mode");
            else
                element.classList.add("c-dark-theme__mode");
        });
        darkButtom.textContent = sun;
        localStorage.setItem("theme", "dark");
    }

    const lightMode = () => {
        darkModeAttribute.forEach((element) => {
            if(element.classList.contains("c-key-event__stage"))
                element.classList.remove("c-key-event__dark-mode");
            else
                element.classList.remove("c-dark-theme__mode");
        });
        darkButtom.textContent = moon;
        localStorage.setItem("theme", "light");
    }

    // Eventos
    darkButtom.addEventListener("click", () =>{

        if(darkButtom.textContent === moon){
            darkMode();
        }else{
            lightMode();
        }

    });

    document.addEventListener("DOMContentLoaded", () => {

        if(localStorage.getItem("theme") === null) localStorage.setItem("theme", "light");

        if(localStorage.getItem("theme") === "light") lightMode();

        if(localStorage.getItem("theme") === "dark") darkMode();
    });

// Responsive Javascript

    // Variable
    const responsiveYoutube = document.querySelector(".js-responsive-javascript__youtube");
    const responsiveGmaps = document.querySelector(".js-responsive-javascript__gmaps");

    // Evento
    document.addEventListener("DOMContentLoaded", () => {

        responsiveMedia(responsiveYoutube, "(min-width:1024px)",
         `<a href="https://www.youtube.com/watch?v=6IwUl-4pAzc&list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&index=91"
         target="_blank" rel="noopener">Ver Vídeo</a>`, 
        `<iframe width="560" height="315" src="https://www.youtube.com/embed/6IwUl-4pAzc" title="YouTube video player" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>`);
        responsiveMedia(responsiveGmaps, "(min-width:1024px)", 
        `<a href="https://goo.gl/maps/nbq6FH7waVQdGbXu8" target="_blank" rel="noopener">Ver Mapa</a>`, 
        `<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11610.29264516334!2d-3.0171405!3d43.323194!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa2b49ebec321262!2sPuente%20Vizcaya!5e0!3m2!1ses!2ses!4v1642155981432!5m2!1ses!2ses" 
        width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);

    });
    // Funciones
    function responsiveMedia(responsiveElement, mediaQuery, mobileContent, desktopContent){

        let breakpoint = window.matchMedia(mediaQuery);

        const responsive = (e) =>{
            if(e.matches){
                responsiveElement.innerHTML = desktopContent;
            }else{
                responsiveElement.innerHTML = mobileContent;
            }

        }

        breakpoint.addListener(responsive);
        responsive(breakpoint);
    }

// Responsive Tester

    // Variable
    const responsiveTesterForm = document.querySelector(".js-responsive-tester__form");

    let tester;

    document.addEventListener("submit", e =>{

        if(e.target === responsiveTesterForm){
            e.preventDefault();

            tester = window.open(responsiveTesterForm.direction.value, 
                                "tester", 
                                `innerWidth=${responsiveTesterForm.ancho.value}`,
                                `innerWidth=${responsiveTesterForm.alto.value}`
                                );
        }

    });

    document.addEventListener("click", (e) =>{

        if(e.target === responsiveTesterForm.cerrar) tester.close();

    });

// Detection Devices (User Agent)

    // Variable
    const detectionDevices = document.querySelector(".js-detection-devices__content");

    const isMobile = {
            android: () => navigator.userAgent.match(/android/i),
            ios: () => navigator.userAgent.match(/iphone|ipad|ipod/i),
            windows: () => navigator.userAgent.match(/windows phone/i),
            any: function() {
                return this.android() || this.ios() || this.windows();
            }
        },
          isDesktop = {
            linux: () => navigator.userAgent.match(/linux/i),
            mac: () => navigator.userAgent.match(/macintosh/i),
            windows: () => navigator.userAgent.match(/windows nt/i),
            any: function() {
                return this.linux() || this.mac() || this.windows();
            }
        },
          isBrowser = {
            chrome: () => navigator.userAgent.match(/chrome/i),
            safari: () => navigator.userAgent.match(/safari/i),
            firefox: () => navigator.userAgent.match(/firefox/i),
            opera: () => navigator.userAgent.match(/opr|opera|opera mini/i),
            ie: () => navigator.userAgent.match(/msie|iemobile/i),
            edge: () => navigator.userAgent.match(/edg/i),
            any: function() {
                return (
                    this.ie() ||
                    this.edge() ||
                    this.opera() ||
                    this.chrome() ||
                    this.safari() ||
                    this.firefox()
                );
            }
        };

        detectionDevices.innerHTML = `
        <ul id="ua">
            <li>User Agent: <b>${navigator.userAgent}</b></li>
            <li> Plataforma: <b>
            ${isMobile.any() ? isMobile.any() : isDesktop.any()}
            </b></li>

            <li> Navegador: <b>
            ${isBrowser.any()}</b></li>
        </ul>`;
    
    // Generar contenido restringido para navegadores
    if(isBrowser.chrome()) detectionDevices.innerHTML += "<p><mark>Este contenido sólo es visible en Chrome</mark></p>";
    if(isBrowser.firefox()) detectionDevices.innerHTML += "<p><mark>Este contenido sólo es visible en Firefox</mark></p>";
    if(isBrowser.edge()) detectionDevices.innerHTML += "<p><mark>Este contenido sólo es visible en Edge</mark></p>";

    // Generar contenido restringido para SO
    if(isDesktop.linux()) detectionDevices.innerHTML += "<p><mark>Descarga el software para Linux</mark></p>";
    if(isDesktop.mac()) detectionDevices.innerHTML += "<p><mark>Descarga el software para Mac</mark></p>";
    if(isDesktop.windows()) detectionDevices.innerHTML += "<p><mark>Descarga el software para Windows</mark></p>";

    // Redifigir a página web mobile
    if(isMobile.android()) window.location.href = "https://jonmircha.com";

// Detection Connection

    // variables
    const isOnLine = () => {

        console.log("Hola");

        const detectionConnectionDiv = document.createElement("div");

        if(Navigator.onLine){
            detectionConnectionDiv.textContent = "Conexión restablecida";
            detectionConnectionDiv.classList.add("c-detection-connection__online");
            detectionConnectionDiv.classList.remove("c-detection-connection__offline");
        }else{
            detectionConnectionDiv.textContent = "Conexión detenida";
            detectionConnectionDiv.classList.add("c-detection-connection__offline");
            detectionConnectionDiv.classList.remove("c-detection-connection__online");
        }
        document.body.insertAdjacentElement("afterbegin", detectionConnectionDiv);
        setTimeout(() => document.body.removeChild(detectionConnectionDiv), 2000);

    }

    // Eventos
    window.addEventListener("online", () => { isOnLine()});
    window.addEventListener("offline", () => isOnLine());