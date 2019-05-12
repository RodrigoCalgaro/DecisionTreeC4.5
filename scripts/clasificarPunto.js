var divPuntoEnArbol = document.querySelector("#punto-en-arbol")
var nodos;
var pasos = []

async function clasificar() {
    var X = parseFloat(document.querySelector("#Xcoord").value)
    var Y = parseFloat(document.querySelector("#Ycoord").value)
    
    document.querySelector("#punto-en-arbol").classList.add("d-none")
    if (isNaN(X) || isNaN(Y)) {
        alert('Para ejecutar esta acción es necesario que los valores de X e Y no sean nulos.')
    } else {
        var point = {
            X,
            Y
        }
        
        pasos = []
        divPuntoEnArbol.classList.add("d-none");
        collapsed = false;
        await dibujarArbol();
        nodos = divPuntoEnArbol.querySelectorAll(".node-branch")

        await clasificarPunto(point, Arbol)
        //setTimeout(function () {
            nodos.forEach(nodo => {
                pasos.forEach(paso => {
                    if (nodo.innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">").includes(paso)) {
                        nodo.parentElement.classList.add('nodo-utilizado')
                    }
                })
            });
        //}, 1000)
    }

}


function clasificarPunto(point, Arbol) {
    if (Arbol.childs) {
        if (point[Arbol.name] <= Arbol.valueOfSplit) {
            Arbol.childs.forEach(child => {
                if (child.subset == '<=') {
                    pasos.push(Arbol.branch)
                    clasificarPunto(point, child)
                }
            })
        } else {
            Arbol.childs.forEach(child => {
                if (child.subset == '>') {
                    pasos.push(Arbol.branch)
                    clasificarPunto(point, child)
                }
            })
        }
    } else {
        pasos.push(Arbol.branch)
        return
    }
}

async function dibujarArbol() {
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
            container: "#punto-en-arbol",
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

    document.querySelector("#punto-en-arbol").classList.remove("d-none")
    var my_chart = new Treant(simple_chart_config);
}