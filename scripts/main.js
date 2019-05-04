const dialog = require('electron').remote.dialog;
const csv = require('csv');
var fs = require('fs');
var Arbol;
//var threshold = 0;

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
            document.getElementById("actual-file").value = fileNames[0];
            document.querySelector("#chart").innerHTML = '';
            document.querySelector("#tree-simple").innerHTML = '';
            document.querySelector("#csv-entrenamiento").classList.add('d-none');
            document.querySelector("#reset").classList.remove('d-none');
            document.querySelector("#navbar").classList.remove('d-none');
            document.querySelector("#arbol").classList.remove('d-none');

            readFile(fileNames[0]);
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

    Arbol = await generarArbol(D, A)
    //fs.writeFileSync('arbol.json', JSON.stringify(Arbol))
    printTree(Arbol)
    document.querySelector("#selection-form-test").classList.remove('d-none');
}

/* Para Graficar el Árbol */
async function printTree(Arbol) {
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
                name: 'Atributo: ' + Arbol.name
            },
            children: await getChilds(Arbol)
        }
    };
    var my_chart = new Treant(simple_chart_config);
}

function getChilds(nodo) {
    var children = []
    if (nodo.childs) {
        nodo.childs.forEach(element => {
            //console.log(element)
            var sup = '';
            var conf = '';
            var name = 'Atributo: ' + element.name
            if (!hasChilds(element)) {
                name = 'Clase: ' + element.name
                sup = 'Soporte ' + parseFloat(element.support * 100).toFixed(2) + ' %'
                conf = 'Confianza ' + parseFloat(element.confidence * 100).toFixed(2) + ' %'
            }
            children = [...children, {
                text: {
                    branch: 'Branch: ' + element.branch,
                    name: name,
                    support: sup,
                    confidence: conf,
                },
                collapsable: true,
                collapsed: hasChilds(element),
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

/* Reset */
function reset() {
    window.location.reload()
}



/* Para Test */

var cantCasos = 0
var cantCorrectas = 0
var exactitud = 0

/* Agrego un evento al botón "Seleccionar Archivo" para que despliegue el cuadro de selección de archivos */
document.getElementById('select-file-test').addEventListener('click', () => {
    dialog.showOpenDialog(fileNames => {
        /* fileNames contiene la ruta del archivo 
            si no se seleccióno ningun archivo se loguea el error
            caso contrario se llama a la función readFile() con la ruta del archivo 
        */
        if (fileNames === undefined) {
            console.log("No file selected");
        } else {
            document.getElementById("actual-file-test").value = fileNames[0];

            readFilePrueba(fileNames[0]);
        }
    });
}, false);


function readFilePrueba(filepath) {
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
            procesarDatasetPrueba(data)
        })
        
    });
    
}

function procesarDatasetPrueba(data) {
    var D = [];
    data.shift() // remuevo el primer objeto (cabecera) que contiene los nombres de los atributos 
    data.forEach(row => {
        D.push(new Point(parseFloat(row[1]), parseFloat(row[2]), row[3]))
    })
    
    cantCasos = 0
    cantCorrectas = 0
    exactitud = 0
    calcularExactitud(D)
}




function calcularExactitud(D) {
    cantCasos = D.length
    D.forEach(async point => {
        await clasificarPunto(point, Arbol)
    })
    exactitud = cantCorrectas / cantCasos * 100
    exactitud = parseFloat(exactitud).toFixed(2)
    mostrarResultados(cantCasos, cantCorrectas, exactitud)
}

function mostrarResultados(cantCasos, cantCorrectas, exactitud) {
    document.querySelector("#resultado-test").classList.remove('d-none');
    document.querySelector("#cantCasos").innerHTML = 'Cantidad de Casos de Test: ' + cantCasos;
    document.querySelector("#cantCorrectas").innerHTML = 'Cantidad de Clasificaciones Correctas: ' + cantCorrectas;
    document.querySelector("#exactitud").innerHTML = 'Exactitud: ' + exactitud + ' %';
}

async function clasificarPunto(point, Arbol) {
    if (Arbol.childs) {
        if (point[Arbol.name] <= Arbol.valueOfSplit) {
            Arbol.childs.forEach(async child => {
                if (child.subset == '<=') {
                    await clasificarPunto(point, child)
                }
            })
        } else {
            Arbol.childs.forEach(async child => {
                if (child.subset == '>') {
                    await clasificarPunto(point, child)
                }
            })
        }
    } else {
        if (Arbol.name == point.Clase) {
            cantCorrectas += 1
        }
    }
}