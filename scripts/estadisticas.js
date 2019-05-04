function setEstadisticas(cantRegistros, tiempoEjec) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    var usoMemoria = Math.round(used * 100) / 100
    
    document.querySelector("#cantRegistros").innerHTML = '<b>Cantidad de Registros Procesados: </b>' + cantRegistros;
    if(tiempoEjec < 1000){
        document.querySelector("#tiempoEjec").innerHTML = '<b>Tiempo de Ejecución: </b>' + tiempoEjec + ' Milisegundos';
    } else {
        document.querySelector("#tiempoEjec").innerHTML = '<b>Tiempo de Ejecución: </b>' + (tiempoEjec/1000).toFixed(2) + ' Segundos';
    }
    document.querySelector("#usoMemoria").innerHTML = '<b>Uso Aproximado de Memoria: </b>' + usoMemoria + ' MB';
}