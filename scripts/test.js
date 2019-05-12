var cantCasos = 0
var cantCorrectas = 0
var exactitud = 0
var tablaIncorrectas = document.querySelector("#tbody")


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
    tablaIncorrectas.innerHTML = ''
    calcularExactitud(D)
}




function calcularExactitud(D) {
    cantCasos = D.length
    D.forEach(async point => {
        await clasificarElemento(point, Arbol)
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

async function clasificarElemento(point, Arbol) {
    if (Arbol.childs) {
        if (point[Arbol.name] <= Arbol.valueOfSplit) {
            Arbol.childs.forEach(async child => {
                if (child.subset == '<=') {
                    await clasificarElemento(point, child)
                }
            })
        } else {
            Arbol.childs.forEach(async child => {
                if (child.subset == '>') {
                    await clasificarElemento(point, child)
                }
            })
        }
    } else {
        if (Arbol.name == point.Clase) {
            cantCorrectas += 1
        } else {
            tablaIncorrectas.innerHTML += `<tr>
            <td>${point.X}</td>
            <td>${point.Y}</td>
            <td>${point.Clase}</td>
            <td>${Arbol.name}</td>
          </tr>`
        }
    }
}