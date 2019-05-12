function showPuntos(){
    document.querySelector("#nav-arbol").classList.remove('active');
    document.querySelector("#arbol").classList.add('d-none');
    
    document.querySelector("#nav-puntos").classList.add('active');
    document.querySelector("#distribucion-de-puntos").classList.remove('d-none');
    
    document.querySelector("#nav-test").classList.remove('active');
    document.querySelector("#csv-test").classList.add('d-none');
    
    document.querySelector("#nav-clasify").classList.remove('active');
    document.querySelector("#clasificar-punto").classList.add('d-none');

    document.querySelector("#nav-info").classList.remove('active');
    document.querySelector("#info").classList.add('d-none');
    plotPoints(D);
}

function showTest(){
    document.querySelector("#nav-arbol").classList.remove('active');
    document.querySelector("#arbol").classList.add('d-none');
    
    document.querySelector("#nav-puntos").classList.remove('active');
    document.querySelector("#distribucion-de-puntos").classList.add('d-none');
    
    document.querySelector("#nav-test").classList.add('active');
    document.querySelector("#csv-test").classList.remove('d-none');

    document.querySelector("#nav-clasify").classList.remove('active');
    document.querySelector("#clasificar-punto").classList.add('d-none');

    document.querySelector("#nav-info").classList.remove('active');
    document.querySelector("#info").classList.add('d-none');
}

function showArbol(){
    document.querySelector("#nav-arbol").classList.add('active');
    document.querySelector("#arbol").classList.remove('d-none');
    
    document.querySelector("#nav-puntos").classList.remove('active');
    document.querySelector("#distribucion-de-puntos").classList.add('d-none');
    
    document.querySelector("#nav-test").classList.remove('active');
    document.querySelector("#csv-test").classList.add('d-none');

    document.querySelector("#nav-clasify").classList.remove('active');
    document.querySelector("#clasificar-punto").classList.add('d-none');

    document.querySelector("#nav-info").classList.remove('active');
    document.querySelector("#info").classList.add('d-none');
}

function clasifyPoint(){
    document.querySelector("#nav-arbol").classList.remove('active');
    document.querySelector("#arbol").classList.add('d-none');
    
    document.querySelector("#nav-puntos").classList.remove('active');
    document.querySelector("#distribucion-de-puntos").classList.add('d-none');
    
    document.querySelector("#nav-test").classList.remove('active');
    document.querySelector("#csv-test").classList.add('d-none');
    
    document.querySelector("#nav-clasify").classList.add('active');
    document.querySelector("#clasificar-punto").classList.remove('d-none');

    document.querySelector("#nav-info").classList.remove('active');
    document.querySelector("#info").classList.add('d-none');
}

function showInfo(){
    document.querySelector("#nav-arbol").classList.remove('active');
    document.querySelector("#arbol").classList.add('d-none');
    
    document.querySelector("#nav-puntos").classList.remove('active');
    document.querySelector("#distribucion-de-puntos").classList.add('d-none');
    
    document.querySelector("#nav-test").classList.remove('active');
    document.querySelector("#csv-test").classList.add('d-none');

    document.querySelector("#nav-clasify").classList.remove('active');
    document.querySelector("#clasificar-punto").classList.add('d-none');

    document.querySelector("#nav-info").classList.add('active');
    document.querySelector("#info").classList.remove('d-none');
}