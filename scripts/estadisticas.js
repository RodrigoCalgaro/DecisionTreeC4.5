function setEstadisticas(cantRegistros, tiempoEjec, usoMemoria, threshold, calculateUsing) {
    document.querySelector("#cantRegistros").innerHTML = '<b>Cantidad de Registros Procesados: </b>' + cantRegistros;
    if (calculateUsing == 'gain') {
        document.querySelector("#formulaUtilizada").innerHTML = '<b>Fórmula Utilizada: Ganancia de Información</b>';
    } else {
        document.querySelector("#formulaUtilizada").innerHTML = '<b>Fórmula Utilizada: Tasa de Ganancia de Información</b>';    
    }
    document.querySelector("#thresholdUtilizado").innerHTML = '<b>Threshold Utilizado: </b>' + threshold;

    if (tiempoEjec < 1000) {
        document.querySelector("#tiempoEjec").innerHTML = '<b>Tiempo Aproximado de Ejecución: </b>' + tiempoEjec + ' Milisegundos';
    } else {
        tiempoEjec = (tiempoEjec / 1000).toFixed(2)
        if (tiempoEjec <= 60) {
            document.querySelector("#tiempoEjec").innerHTML = '<b>Tiempo Aproximado de Ejecución: </b>' + tiempoEjec + ' Segundos';
        } else {
            document.querySelector("#tiempoEjec").innerHTML = '<b>Tiempo Aproximado de Ejecución: </b>' + Math.trunc(tiempoEjec / 60) + ' Minutos, ' + (tiempoEjec % 60).toFixed(2) + ' Segundos';
        }
    }

    if (usoMemoria < 1024) {
        document.querySelector("#usoMemoria").innerHTML = '<b>Uso Aproximado de Memoria: </b>' + (usoMemoria).toFixed(2) + ' KB';
    } else {
        document.querySelector("#usoMemoria").innerHTML = '<b>Uso Aproximado de Memoria: </b>' + (usoMemoria / 1024).toFixed(2) + ' MB';
    }
}