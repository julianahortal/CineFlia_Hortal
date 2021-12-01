

history.scrollRestoration = 'manual';

// ===============================|OBJETO PELICULA|=========================================
function Pelicula(titulo, duracion, clasificacion, genero, imagenURL, descripcion, dataTargetModal, btnEntradas){
    this.titulo = titulo;
    this.duracion = duracion;
    this.clasificacion = clasificacion;
    this.genero = genero;
    this.imagenURL = imagenURL;
    this.descripcion = descripcion;
    this.dataTargetModal = dataTargetModal;
    this.btnEntradas = btnEntradas;
}

// ===============================|VARIABLE GLOB PELICULA ELEGIDA|=========================================
let peliculaElegida = "";

// ================================= |FUNCIONES| ========================================= 

// ---ASIGNA HORARIOS SEGÚN LA CLASIFICACIÓN DE LA PELÍCULA------
function horariosFunciones(pelicula){
    const horarios = ["12.15","13.25","14.35","15.50","16.05","17.15","18.25","19.35","20.45","21.10","22.20","23.30"];
    switch(pelicula.clasificacion){
        case 'SAM 18':
        case 'SAM 16':
            return horarios.slice(4, horarios.length);
        break;
        case 'ATP':
        case 'SAM 13':
            return horarios.slice(0,6);  
        break;
        case 'SAM 13 C/R':
            return horarios.slice(3,8); 
        default:
            return alert("Seleccione un horario");
        break;
    }
}

//-----Carga horarios disponibles en el Select ---
function cargarHorarios(pelicula){
    const horarios = horariosFunciones(pelicula);  
    let opciones = "";          
    horarios.forEach((horario) => {
        opciones += `<option value="${horario}">${horario}</option>`;        
    });
    $("#horarios").append(opciones);
}
//

//-----funciones para establecer un array de fechas en String ---
function ArrayFechas(fechaInicio, diasAgregar) {
    var arrayFechas = [];
    for (var i = 0; i <= diasAgregar; i++) {
        var fechaActual = new Date();
        fechaActual.setDate(fechaInicio.getDate() + i);
        arrayFechas.push(DiaString(fechaActual.getDay()) + ", " + fechaActual.getDate() + " de " + MesString(fechaActual.getMonth()));
    }
    return arrayFechas;
}

function MesString(mesIndex) {
    var f = new Date();
    var mes = new Array();
    mes[0] = "enero";
    mes[1] = "febrero";
    mes[2] = "marzo";
    mes[3] = "abril";
    mes[4] = "mayo";
    mes[5] = "junio";
    mes[6] = "julio";
    mes[7] = "agosto";
    mes[8] = "septiembre";
    mes[9] = "octubre";
    mes[10] = "noviembre";
    mes[11] = "diciembre";

    return mes[mesIndex];
}

function DiaString(diaIndex) {
    var dia = new Array(7);
    dia[0] = "Domingo";
    dia[1] = "Lunes";
    dia[2] = "Martes";
    dia[3] = "Miércoles";
    dia[4] = "Jueves";
    dia[5] = "Viernes";
    dia[6] = "Sábado";

    return dia[diaIndex];
}

//-----Carga fechas disponibles en el Select ---
function cargarFechas(fechaInicio){
    var fechaInicio = new Date();
    const arrayFechas = ArrayFechas(fechaInicio, 6);
    let opciones = "";        
    arrayFechas.forEach((fecha) => {
        opciones += `<option value="${fecha}">${fecha}</option>`;        
    });
    $("#fechas").append(opciones);
}
//

//-----Dibujo Cards de las películas en Cartelera + Proximos estrenos-------

function crearCardProxEstreno(pelicula){
    let containerProxEstreno = document.getElementById('posters');
        let posterEstreno = document.createElement('div');
        posterEstreno.setAttribute('id', '${pelicula.dataTargetModal}')
        posterEstreno.setAttribute('class',"movie-container")
            posterEstreno.innerHTML = 
            `   <div id="${pelicula.dataTargetModal}" width=10em>
                    <div class="afiche-pelicula afiche-prox">
                        <div class="etiqueta-pelicula">
                            <div class="tag-anticipada">Próximamente</div>
                        </div>
                        <img class="img-responsive" src= ${pelicula.imagenURL} alt=${pelicula.titulo}>
                    </div>
                    <div class="titulo-pelicula">
                        <h6>${pelicula.titulo}</h6>  
                    </div>
                </div>
            `
            containerProxEstreno.appendChild(posterEstreno);
}

function crearCardPelicula(pelicula){
    let containerCartelera = document.getElementById('posters');
    let posterPelicula = document.createElement('div');
    posterPelicula.setAttribute('class',"movie-container")
        posterPelicula.innerHTML = 
        `<div id="${pelicula.dataTargetModal}" width=10em>
            <div id= class="afiche-pelicula">
            <img class="img-responsive" src= ${pelicula.imagenURL} alt=${pelicula.titulo}>
            </div>
            <div class="titulo-pelicula">
                <h6>${pelicula.titulo}</h6>  
            </div>
        </div>

        `
        containerCartelera.appendChild(posterPelicula);

        //AL SELECCIONAR PELICULA, SE CREA LA SIGUIENTE SECCIÓN
        $(`#${pelicula.dataTargetModal}`).on("click", function (){
            let seleccionEntradas = document.createElement("div");  
                        
            seleccionEntradas.innerHTML = `
            <div id="container-div-entradas">
                <p><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg> Ver horarios y comprar entradas: </p>
                <div class="card-1">
                    <h3 class="card-header">${pelicula.titulo}</h3>
                    <div class="card-body-1">
                        <div>
                            <img src="${pelicula.imagenURL}" alt="${pelicula.titulo}"> 
                        </div>                        
                        <div id="confirmar-entradas">
                            <h5>${pelicula.titulo}</h5> 
                            <strong><h6>${pelicula.duracion} | ${pelicula.clasificacion} | ${pelicula.genero}</h6></strong>
                            <p>${pelicula.descripcion}</p>
                            <div class="row-b">
                                <div>
                                    <div class="form-group">
                                    <label for="fechas">Fechas</label>
                                        <select class="form-control" id="fechas">
                                        <option value="0">-- Seleccione una fecha--</option>
                                        </select>
                                    </div>                                
                                    <div id="form-entradas" class="form-group">
                                        <label for="horarios">Horarios</label>
                                        <select class="form-control" id="horarios">
                                            <option value="0">-- Seleccione un horario--</option>                                        
                                        </select>
                                    </div>
                                </div>
                                <div>                        
                                    <div class="form-group">
                                        <label for="cant-entradas">Cantidad Entradas</label>
                                        <select class="form-control" id="entradas">
                                            <option value="0">-- Seleccione cantidad de entradas--</option>
                                            <option value="1">1 entrada</option>
                                            <option value="2">2 entradas</option>
                                            <option value="3">3 entradas</option>
                                            <option value="4">4 entradas</option>
                                            <option value="5">5 entradas</option>
                                            <option value="6">6 entradas</option>
                                            <option value="7">7 entradas</option>
                                            <option value="8">8 entradas</option>
                                            <option value="9">9 entradas</option>
                                            <option value="10">10 entradas</option>
                                        </select>
                                    </div>
                                    <button id="botonCompra" type="button" class="btn btn-primary" onclick="reservarEntradas()" data-toggle="modal" data-target=".compra">Reservar</button>
                                </div>
                            </div>                    
                        </div>                                                               
                    </div>
                </div>  
            </div>            
                `
                peliculaElegida = pelicula.titulo;
                containerEntradas.innerHTML = "";
                containerEntradas.appendChild(seleccionEntradas);                  
                cargarHorarios(pelicula);
                cargarFechas();
                //SCROLL A SECCIÓN 
                let elmnt = document.getElementById("container-div-entradas");
                elmnt.scrollIntoView();
                
        })
        
}


//-----Carga la info JSON y dibuja en el DOM ----

function cargarProxEstreno(peliculas, proxEs) {
    peliculas.forEach((pelicula) => {

        var cardProximoEstreno = new Pelicula(
            pelicula.titulo,
            pelicula.duracion,
            pelicula.clasificacion,
            pelicula.genero,
            pelicula.imagenURL,
            pelicula.descripcion,
            pelicula.dataTargetModal,
            pelicula.btnEntradas
        );

        proxEs.push(cardProximoEstreno);
        crearCardProxEstreno(cardProximoEstreno);
    });
}

function cargarCartelera(peliculas, cartelera) {
    peliculas.forEach((pelicula) => {
        
      var cardPelicula = new Pelicula(
        pelicula.titulo,
        pelicula.duracion,
        pelicula.clasificacion,
        pelicula.genero,
        pelicula.imagenURL,
        pelicula.descripcion,
        pelicula.dataTargetModal,
        pelicula.btnEntradas
      );
    cartelera.push(cardPelicula);
    crearCardPelicula(cardPelicula);
    });
}

//-----Botón fin del proceso-----

function reservarEntradas() {
    const fechaElegida = document.getElementById("fechas").value;
    const horarioElegido = document.getElementById("horarios").value;
    const cantidadEntradas = document.getElementById("entradas").value;      
    if (fechaElegida != "0" && horarioElegido != "0" && cantidadEntradas != "0") {
        document.getElementById("tituloReciboCompra").innerHTML ="¡Su compra ha sido exitosa!";
        document.getElementById("detalleReciboCompra").innerHTML = `Ha comprado ${cantidadEntradas} entradas para ver <strong>${peliculaElegida}</strong>, el ${fechaElegida} a las ${horarioElegido} hs.`;
    } else {
        document.getElementById("tituloReciboCompra").innerHTML ="Hubo un eror"
        document.getElementById("detalleReciboCompra").innerHTML ="Por favor, vuelva a intentar nuevamente"          
    }
}

//----Scroll a secciones ---
$(`#btnboletos`).on("click", function (){
    let elmnt = document.getElementById("boletos");
    elmnt.scrollIntoView();

})
// ============================================================================================= 

// ===================== |AJAX|========================

var proxEstreno = [];
$.ajax({
    url: "./js/proximosEstrenos.json",
    dataType: "json",
    success: (response) => {
    cargarProxEstreno(response, proxEstreno);
}
});

var cartelera = [];
$.ajax({
    url: "./js/cartelera.json",
    dataType: "json",
    success: (response) => {
    cargarCartelera(response, cartelera);
}
});
