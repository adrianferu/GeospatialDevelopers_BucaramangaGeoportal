//Si tienes dudas puedes consultar el borrador del primer ejercicio, archivo proyecto170123

//Inicialización del mapa -->
var map = L.map('mapBuc').setView([7.137715182515009, -73.12034917965892], 20);

//Coordenadas al toque del cursor
//Las coordenadas se pueden visualizar si el código se deja por encima de la declaración
//de los basemaps
map.on("mousemove", function(e){
    $("#coordinate").html(`Lat:${e.latlng.lat.toFixed(3)} , Lng : ${e.latlng.lng.toFixed(3)}`)
});

//Agregamos una escala interactiva
L.control.scale({position: "bottomleft"}).addTo(map);


//2. Agregar simbologia a capas. Aqui se usa una variable por separado para administrar los estilos(por cada capa)
//Estilos capa manzanas: Poligono
var manzanasStyle = {
    color: "purple",
    opacity: "0.21",
    weight: "1"
}

//Estilos capa capacidad instalada IPS: Puntos
    //Ademas del marcador, por separado le cambiamos cosas como el colory el radio
var capInstaladStyle = {
    radius:10,
    fillColor: "green",
    color: "orange"
}



// 1. Agregamos nuestras capas
    // (antes en formato geojson y luego convertidas a .js)
    // Importante: En la documentacion aparece la funcion, pero ten en cuenta que debes asignar ese método
    // a una variable por cada una de als capas.
    // 1. estamos especificando que al mapa sera agregada la capa capInstalad (asi llamamos a la variable que guarda la capacidadInstalda.js)
var capacidadInstalada = L.geoJSON(capInstalad, {
    pointToLayer: function(geoJsonPoint, latlng) {
        return L.circleMarker(latlng, capInstaladStyle); //el amrcador por defecto es una comilla. Aqui lo cambiamos por u circulo
    }
}).addTo(map); //pointToLayer me sirve para cambiar el estilo de una capa de puntos. feature hace referencia a un geojson
//var delitosBucar = L.geoJSON(delitosBuc).addTo(map); // Muy pesado. Por ahora no lo cargar'e
var departamentos = L.geoJSON(departamentosColombia).addTo(map);
var manzanasCensales = L.geoJSON(mgnUrbBucaramanga, {
    style:manzanasStyle, //Referencia a una variable a parte con los estilos
    onEachFeature: function (feature, layer) {//onEachFeature sirve para mostrar popUps (contenido AL DAR CLICK)
        layer.bindPopup(feature.properties.cod_dane) //Accede al JS de mgnUrbBucaramanga.js a la ruta feature-properties-id de la manzaana
    }   
}).addTo(map);


//Agregamos los servicios WMS()
    /* En este caso agregamos el WMS de delitos*/
    var delitosWMS = L.tileLayer.wms("http://localhost:8080/geoserver/ProyectoGeospatial_Bucaramanga/wms", { 
        //Entre comillas(arriba) va el enlace del geoserver
        layers: 'ProyectoGeospatial_Bucaramanga:delitosBucaramanga',
        //Aqui(arriba) va el nombre de la capa que aparece en el layer preview de geoserver
        format: 'image/png',
        transparent: true,
        attribution: ""
    }).addTo(map);//NUNCA OLVIDES LA ÚLTIMA PARTE. EL .addTo(map)
    
    // WMS departamentos
    // var departosWMS = L.tileLayer.wms("http://localhost:8080/geoserver/ProyectoGeospatial_Bucaramanga/wms", { 
    //     //Entre comillas(arriba) va el enlace del geoserver
    //     layers: 'ProyectoGeospatial_Bucaramanga:departamentosColombia',
    //     //Aqui(arriba) va el nombre de la capa que aparece en el layer preview de geoserver
    //     format: 'image/png',
    //     transparent: true,
    //     attribution: "Weather data © 2012 IEM Nexrad"
    // }).addTo(map)//NUNCA OLVIDES LA ÚLTIMA PARTE. EL .addTo(map)






//Adición de BASEMAP
var openMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
//Adicion Basemap2
var stadiaDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);
//Adicion Basemap3
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);





//Agregamos un controlador para hacer ZOOM
map.zoomControl.setPosition("topright");//Barrita para hacer zoom


//Agregamos un marcador. En este caso son las coordenadas del Caballo de Bolívar
var marker1 = L.marker([7.131149065006559, -73.12498949967019]).addTo(map);   //UIS
var marker2 = L.marker([7.120658562759212, -73.11496845847574]).addTo(map);//Clinica Chicamocha
var marker3 = L.marker([7.099896179732089, -73.1072847161463]).addTo(map);//c.c. Cacique
var marker4 = L.marker([7.1104930015952705, -73.16373345208227]).addTo(map);//Parq. Industr.
var marker5 = L.marker([7.10864526581061, -73.11763867381671]).addTo(map);//San Andresito


//Switch entre BaseMaps. Para mayor info consultar en https://leafletjs.com/reference.html#control-layers
    //IMPORTANTE> Dejamos esta funcion aqui debido a que javascript lee todo de arriba hacia abajo.
    //Si se dejaba más arriba, el switch no se activa
var baseLayers = {
    "OpenStreetMap": openMap,
    "StadiaDark": stadiaDark,
    "EsriImagery": Esri_WorldImagery
};

// Esto es para poder encender y apagar marcadores
// var overlays = {
//     "marcador": marker1,marker2,marker3,marker4,marker5
//     //"Roads": roadsLayer
// };

// Usaremos esta misma estructura de arriba para crear un encendido de capas
var overlays = {
    "IPS": capacidadInstalada,
    "delitos": delitosWMS,//Este toco como WMS porque era el más grande    
    "Manzanas": manzanasCensales,
    "Deptos": departamentos,
    

    
};

L.control.layers(baseLayers, overlays).addTo(map);

// Add Print Control to map: Leaflet Browser Print
//Recuerda: IMPORTANTE EL LUGAR DONDE DEJAS CADA PIEZA DE CÓDIGO, PARA QUE SE VISUALICE
L.control.browserPrint({position: 'topleft'}).addTo(map);//NO APARECE, REVISAR


