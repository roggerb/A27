var map = L.map('main_map').setView([6.2518400, -75.5635900], 8);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(map);


L.marker([6.302209, -75.547665]).addTo(map);

L.marker([6.300631, -75.548293]).addTo(map);

L.marker([6.300930, -75.549999]).addTo(map);

$.ajax ( {

    dataType: "json",

    url: "api/bicicletas",

    success: function(result){

        console.log(result);

        result.bicicletas.forEach(function(bici){

            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);

        });

    }

});
