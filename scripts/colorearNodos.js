function colorearNodos() {
    var nodos = document.querySelector('#arbol').querySelectorAll(".node-confidence")
    nodos.forEach(nodo => {
        if (nodo.innerHTML == 'Confianza: 100.00 %'){
            nodo.parentElement.classList.add('nodo-puro')
        } else {
            if (nodo.innerHTML != ''){
                nodo.parentElement.classList.add('nodo-impuro')
            }
        }
    });
}