function plotPoints(Dataset) {
    var C = [] // Defino un arreglo vacío
    D.forEach(d => {
        C.push(d.Clase)
    });
    C = [...new Set(C.map(a => a))]
    var C1 = C[0]
    var C2 = C[1]

    var clase1 = {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter',
        name: 'Clase: ' + C1,
        marker: {
            size: 8,
            color: 'red'
        }
    };

    var clase2 = {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter',
        name: 'Clase: ' + C2,
        marker: {
            size: 8,
            color: 'blue'
        }
    };

    Dataset.forEach(point => {
        if (point.Clase == C1) {
            clase1.x.push(point.X)
            clase1.y.push(point.Y)
        } else {
            clase2.x.push(point.X)
            clase2.y.push(point.Y)
        }
    });

    var data = [clase1, clase2];
    for (let i = 0; i < cantPartitions; i++) {
        const element = partitions[i];
        data.push(element)
    }

    var options = {
        scrollZoom: true,
        displayModeBar: false,
    };

    Plotly.newPlot('chart', data, {}, options);
}


function redibujarPuntos(paso) {
    cantPartitions = paso
    if (paso == 0) {
        document.querySelector("#btnPartAnterior").disabled = true
    }
    if (paso == partitions.length) {
        document.querySelector("#btnPartSiguiente").disabled = true
    }
    if (paso > 0 && paso < partitions.length) {
        document.querySelector("#btnPartAnterior").disabled = false
        document.querySelector("#btnPartSiguiente").disabled = false
    }

    plotPoints(D)

}

function partAnterior() {
    var actual = parseInt(document.querySelector("#partActual").value)

    if (actual == 0) {
        document.querySelector("#btnPartAnterior").disabled = true
        return
    }

    document.querySelector("#partActual").value = actual - 1
    redibujarPuntos(actual - 1)
}

function partSiguiente() {
    var actual = parseInt(document.querySelector("#partActual").value)
    document.querySelector("#partActual").value = actual + 1
    redibujarPuntos(actual + 1)
}