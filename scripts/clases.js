function Hoja(branch, name) {
    this.branch = branch
    this.name = name;
}


function Nodo(branch, name) {
    this.branch = branch
    this.name = name;
    this.childs = [];
}

Nodo.prototype.add = function (element) {
    this.childs.push(element);
}

function Point(x,y,clase){
    this.X = x;
    this.Y = y;
    this.Clase = clase;
}