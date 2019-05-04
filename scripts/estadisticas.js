function setEstadisticas(cantRegistros, tiempoEjec, usoMemoria) {
    document.querySelector("#cantRegistros").innerHTML = '<b>Cantidad de Registros Procesados: </b>' + cantRegistros;
    if (tiempoEjec < 1000) {
        document.querySelector("#tiempoEjec").innerHTML = '<b>Tiempo Aproximado de Ejecución: </b>' + tiempoEjec + ' Milisegundos';
    } else {
        document.querySelector("#tiempoEjec").innerHTML = '<b>Tiempo Aproximado de Ejecución: </b>' + (tiempoEjec / 1000).toFixed(2) + ' Segundos';
    }

    if (usoMemoria < 1024) {
        document.querySelector("#usoMemoria").innerHTML = '<b>Uso Aproximado de Memoria: </b>' + (usoMemoria).toFixed(2) + ' KB';
    } else {
        document.querySelector("#usoMemoria").innerHTML = '<b>Uso Aproximado de Memoria: </b>' + (usoMemoria / 1024).toFixed(2) + ' MB';
    }
}