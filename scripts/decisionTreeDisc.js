function decisionTree(D, A, T, Branch) {
    // En la primer llamada a la función la variable Arbol = null y se genera el nodo raiz.
    // En la segunda llamada a la función (primer iteración) asigno la raiz (T) a la variable Árbol.
    if (!Arbol) {
        Arbol = T
    }

    // Cargo en C los Cj del dataset.       
    var C = [] // Defino un arreglo vacío
    D.forEach(d => {
        C.push(d.class)
    });
    C = [...new Set(C.map(a => a))]

    // * TO DO: Cargar el arreglo ordenando por cantidad de ocurrencias de cada elemento (De Mayor a Menor) 


    // Cargo en A los Ai del dataset.
    var attributes = Object.keys(D[0])
    attributes.pop() // pop() remueve el último elemento del arreglo que corresponde al campo con la clase a que corresponde la entidad.
    var A = attributes

    if (C.length == 1) {
        // Existe una sola clase cj perteneciente al conjunto de clases C.
        // Agrego una hoja al árbol. 
        var hoja = new Hoja(Branch, C[0])
        T.add(hoja)
        /* CASO BASE 1 */
    } else {
        if (A.length == 0) {
            // El conjunto de atributos A del dataset es nulo. 
            // Agrega una hoja etiquetada con la clase cj, que es la clase más frecuente en D.
            var hoja = new Hoja(Branch, C[0])
            T.add(hoja)
            /* CASO BASE 2  */
        } else {
            // D contiene ejemplos pertenecientes a una mezcla de clases. 
            // Seleccionamos un único atributo para particionar D en subconjuntos de modo que cada subconjunto sea puro.

            // Asigno a la variable p0 la entropía del dataset.
            var p0 = impurityEval_1(D)

            // Por cada atributo evalúo su impureza y calculo la ganancia.
            // La variable Ag es un objeto que está conformado por el nombre del atributo y la ganancia del mismo (p0 - pi).
            var Ag = null;
            A.forEach(Ai => {
                var pi = impurityEval_2(Ai, D)
                // Si Ag no es null o la ganancia del objeto es menor a la del objeto que se está evaluando
                // se asigna a la misma los valores del atributo que se está procesando
                if (!Ag || p0 - pi > Ag.gain) {
                    Ag = {
                        nombre: Ai,
                        gain: p0 - pi
                    }
                }
            });

            // Finalizada la evaluación de cada atributo en A comparo la ganancia con el threshold.
            if (Ag.gain < threshold) {
                // Si la ganancia del atributo Ag es menor al threshold definido
                // agrega una hoja etiquetada con la clase cj, que es la clase más frecuente en D.
                var hoja = new Hoja(Branch, C[0]);
                T.add(hoja);
                /* CASO BASE 3 */
            } else {
                // Ag es capaz de reducir la impureza p0.

                // Agrego un Nodo para el atributo Ag.
                var nodo = new Nodo(Branch, Ag.nombre)
                // Si es la primer llamada a la función T = null, por lo tanto nodo será el nodo raíz y no admite el metodo add()
                if (T) {
                    T.add(nodo)
                } else {
                    T = nodo
                }

                // Los valores posibles de Ag son v1, ..., vm. Cargo en un arreglo valuesOfAi esos valores.
                var valuesOfAi = [];
                D.forEach(d => {
                    valuesOfAi.push(d[Ag.nombre])
                });
                valuesOfAi = [...new Set(valuesOfAi.map(a => a))]

                // Partir D en m subconjuntos D1, ..., Dm basados ​​en los m valores de Ag.
                valuesOfAi.forEach(ai => {
                    var subsetD = []
                    var AsinAg = A
                    for (var i = 0; i < AsinAg.length; i++) {
                        if (AsinAg[i] === ai) {
                            AsinAg.splice(i, 1);
                        }
                    }

                    D.forEach(d => {
                        if (d[Ag.nombre] == ai) {
                            subsetD.push(d)
                        }
                    });

                    // Si el subset de D no está vacío llamo a la función con los nuevos parámetros 
                    if (subsetD != []) {
                        /* 
                            SetTimeout() tiene dos parámetros
                            El primero es la función a ejecutar, en este caso (decisionTree(subsetD, AsinAg, nodo, ai))
                            El segundo parámetro es un valor en milisegundos que indica después de cuanto tiempo se ejecutará la función
                            Esto se hace porque sinó al ser una función recursiva 
                            */
                        /* setTimeout(() => {
                            decisionTree(subsetD, AsinAg, nodo, ai)
                         }, 0); */
                        decisionTree(subsetD, AsinAg, nodo, ai)
                    }
                });

            }
        }

    }

}



function impurityEval_1(D) {
    var CantRegistros = D.length // Cantidad de registros en el dataset
    var C = [] // Defino un arreglo vacío
    D.forEach(d => {
        C.push(d.class)
    });
    C = [...new Set(C.map(a => a))]
    var C1 = 0 // Cantidad de registros con la Clase 1
    var C2 = 0 // Cantidad de registros con la Clase 2
    var entropia_D = 0;

    D.forEach(d => {
        if (d.class == C[0]) {
            C1 += 1
        }

        if (d.class == C[1]) {
            C2 += 1
        }
    });

    if (C1 > 0) {
        entropia_D += -(C1 / CantRegistros) * (Math.log2(C1 / CantRegistros))
    }
    if (C2 > 0) {
        entropia_D += -(C2 / CantRegistros) * (Math.log2(C2 / CantRegistros))
    }

    return entropia_D
}

function impurityEval_2(Ai, D) {
    var entropia = 0

    var valuesOfAi = [];
    D.forEach(d => {
        valuesOfAi.push(d[Ai])
    });
    valuesOfAi = [...new Set(valuesOfAi.map(a => a))]


    valuesOfAi.forEach(ai => {
        var Cant = 0
        var subsetD = []
        D.forEach(d => {
            if (d[Ai] == ai) {
                Cant += 1
                subsetD.push(d)
            }
        });
        var aux = ((Cant / D.length) * impurityEval_1(subsetD))
        entropia += aux
    });

    return entropia
}

