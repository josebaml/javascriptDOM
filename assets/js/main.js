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

    // Eventos
    countdown_button.addEventListener("click", function(e){
        e.preventDefault();
        
        let completDate = `${countDate.value} ${countTime.value}`;
        
        let dateValue = new Date(completDate);
        let day = dateValue.getDate();
        let month = dateValue.getMonth() + 1;
        let year = dateValue.getFullYear();
        let hour = dateValue.getHours();
        let minutes = dateValue.getMinutes();
        //alert([day, month, year].join('/'));
        console.log(day, month, year, hour, minutes);
           
    });