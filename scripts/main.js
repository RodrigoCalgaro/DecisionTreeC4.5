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
            document.querySelector("#selection-form").classList.add('d-none');
            document.querySelector("#reset").classList.remove('d-none');

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

function procesarDataset(data) {
    var D = [];
    data.shift() // remuevo el primer objeto (cabecera) que contiene los nombres de los atributos 
    data.forEach(row => {
        D.push(new Point(parseFloat(row[1]), parseFloat(row[2]), row[3]))
    })
    plotPoints(D);
    drawTree(D);
}

async function drawTree(D) {
    var A = ['X', 'Y'];

    Arbol = await generarArbol(D, A)
    printTree(Arbol)
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
                name: Arbol.name
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
            children = [...children, {
                text: {
                    branch: 'Branch: ' + element.branch,
                    name: element.name
                },
                collapsable: true,
                collapsed: hasChilds(element),
                children: getChilds(element)
            }] 
        })
        return children
    }
}

function hasChilds(element){
    if (element.childs){
        return true
    } else {
        return false
    }
}


function reset(){
    window.location.reload()
}