const dialog = require('electron').remote.dialog;
const csv = require('csv');
var fs = require('fs');
var Arbol;

/* Agrego un evento al botón "Seleccionar Archivo" para que despliegue el cuadro de selección de archivos */
document.getElementById('select-file').addEventListener('click', () => {
    dialog.showOpenDialog(fileNames => {
        /* fileNames contiene la ruta del archivo 
            si no se seleccióno ningun archivo se loguea el error
            caso contrario se llama a la función readFile() con la ruta del archivo 
        */
        if (fileNames === undefined) {
            console.log("No file selected");
        } else {
            if (confirm(`Generar Árbol de Decisión para ${fileNames[0]}`)) {
                document.getElementById("actual-file").value = fileNames[0];
                document.querySelector("#chart").innerHTML = '';
                document.querySelector("#tree-simple").innerHTML = '';
                document.querySelector("#csv-entrenamiento").classList.add('d-none');
                document.querySelector("#reset").classList.remove('d-none');
                document.querySelector("#navbar").classList.remove('d-none');
                document.querySelector("#arbol").classList.remove('d-none');

                readFile(fileNames[0]);
            }
        }
    });
}, false);


function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
        if (err) {
            alert("An error ocurred reading the file :" + err.message);
            return;
        }

        csv.parse(data, function (err, data) {
            if (err) {
                console.error(err);
                return false;
            }
            procesarDataset(data)
        })

    });

}

var D = [];

function procesarDataset(data) {
    /* var D = []; */
    data.shift() // remuevo el primer objeto (cabecera) que contiene los nombres de los atributos 
    data.forEach(row => {
        D.push(new Point(parseFloat(row[1]), parseFloat(row[2]), row[3]))
    })
    /* plotPoints(D); */
    drawTree(D);
}

async function drawTree(D) {
    var A = ['X', 'Y'];
    var threshold = parseFloat(document.querySelector("#threshold").value);
    var calculateUsing = document.querySelector("#calculateUsing").value;

    var t_inicial = Date.now();
    var mem_inicial = process.memoryUsage().heapUsed
    /* Llamada a la función que genera el árbol */
    Arbol = await generarArbol(D, A, threshold, calculateUsing)
    var t_final = Date.now();
    var mem_final = process.memoryUsage().heapUsed

    var t_ejecucion = t_final - t_inicial
    var mem_usage = (mem_final - mem_inicial) / 1024

    setEstadisticas(D.length, t_ejecucion, mem_usage, threshold, calculateUsing)

    //fs.writeFileSync('arbol.json', JSON.stringify(Arbol))
    document.querySelector("#iptActual").value = arbolesStepByStep.length
    document.querySelector("#iptActual").max = arbolesStepByStep.length
    document.querySelector("#iptTotal").value = arbolesStepByStep.length
    printTree(Arbol, "#tree-simple")
    document.querySelector("#selection-form-test").classList.remove('d-none');
}

/* Para Graficar el Árbol */
var collapsed = true

async function printTree(Arbol) {
    var sup = '';
    var conf = '';
    var name = '';
    if (!hasChilds(Arbol)) {
        name = 'Clase: ' + Arbol.name
        sup = 'Soporte: ' + parseFloat(Arbol.support * 100).toFixed(2) + ' %'
        conf = 'Confianza: ' + parseFloat(Arbol.confidence * 100).toFixed(2) + ' %'
    } else {
        name = 'Atributo: ' + Arbol.name
    }

    var simple_chart_config = {
        chart: {
            container: "#tree-simple",
        },

        node: {
            collapsable: true
        },

        nodeStructure: {
            text: {
                branch: 'Branch: root',
                name: name,
                support: sup,
                confidence: conf,
            },
            children: await getChilds(Arbol)
        }
    };

    document.querySelector("#cargando").classList.add("d-none")
    document.querySelector("#step-by-step").classList.remove("d-none")
    document.querySelector("#colapsar-contraer").classList.remove("d-none")
    document.querySelector("#tree-simple").classList.remove("d-none")
    var my_chart = new Treant(simple_chart_config);
    colorearNodos();
}

function getChilds(nodo) {
    var children = []
    if (nodo.childs && nodo.childs.length != 0) {
        nodo.childs.forEach(element => {
            var sup = '';
            var conf = '';
            var name = 'Atributo: ' + element.name
            if (!hasChilds(element)) {
                name = 'Clase: ' + element.name
                sup = 'Soporte: ' + parseFloat(element.support * 100).toFixed(2) + ' %'
                conf = 'Confianza: ' + parseFloat(element.confidence * 100).toFixed(2) + ' %'
            }
            children = [...children, {
                text: {
                    branch: 'Branch: ' + element.branch,
                    name: name,
                    support: sup,
                    confidence: conf,
                },
                collapsable: true,
                collapsed: (collapsed) ? hasChilds(element) : false,
                children: getChilds(element)
            }]
        })
        return children
    }
}

function hasChilds(element) {
    if (element.childs) {
        return true
    } else {
        return false
    }
}

function colapsar_contraer() {
    if (collapsed) {
        collapsed = false
    } else {
        collapsed = true
    }
    printTree(Arbol);
}

function redibujarArbol(paso) {
    if (paso == 1) {
        document.querySelector("#btnAnterior").disabled = true
    }
    if (paso == arbolesStepByStep.length) {
        document.querySelector("#btnSiguiente").disabled = true
    }
    if (paso > 1 && paso < arbolesStepByStep.length) {
        document.querySelector("#btnAnterior").disabled = false
        document.querySelector("#btnSiguiente").disabled = false
    }

    printTree(arbolesStepByStep[parseInt(paso) - 1])

}

function anterior() {
    collapsed = false
    var actual = parseInt(document.querySelector("#iptActual").value)
    document.querySelector("#iptActual").value = actual - 1
    redibujarArbol(actual - 1)
}

function siguiente() {
    collapsed = false
    var actual = parseInt(document.querySelector("#iptActual").value)
    document.querySelector("#iptActual").value = actual + 1
    redibujarArbol(actual + 1)
}

/* Reset */
function reset() {
    window.location.reload()
}