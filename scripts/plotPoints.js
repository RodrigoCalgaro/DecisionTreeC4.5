function plotPoints(Dataset) {
    var C1 = 'false';
    var C2 = 'true';

    var clase1 = {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter',
        name: 'Class: '+ C1,
        //text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
        marker: {
            size: 12
        }
    };

    var clase2 = {
        x: [],
        y: [],
        mode: 'markers',
        type: 'scatter',
        name: 'Class: '+ C2,
        //text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
        marker: {
            size: 12
        }
    };

    Dataset.forEach(point => {
        if (point.Clase == C1){
            clase1.x.push(point.X)
            clase1.y.push(point.Y)
        } else {
            clase2.x.push(point.X)
            clase2.y.push(point.Y)
        }
    });


    var data = [clase1, clase2];

    var layout = {
        /* xaxis: {
            range: [0.75, 5.25]
        },
        yaxis: {
            range: [0, 8]
        }, */
        /* title: 'Distribución de Puntos' */
    };

    Plotly.newPlot('chart', data, layout);
}