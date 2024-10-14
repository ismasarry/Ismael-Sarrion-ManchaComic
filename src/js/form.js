
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formularioActividad');
    var tipoActividad = document.getElementById('tipoActividad');
    var sitioActividad = document.getElementById('sitioActividad');

    var sitiosOriginales = [
        "Jardín del Prado",
        "Sala Casino 1",
        "Sala Casino 2",
        "Sala Casino 3",
        "Sala Casino 4",
        "Sala Casino 5",
        "Sala Casino 6",
        "Sala Casino 7",
        "Sala Casino 8",
        "Sala Casino 9",
        "Sala Casino 10",
        "Sala Cueva 1",
        "Sala Cueva 2"
    ];

    function cambiarSitioActividad() {
        var selectedType = tipoActividad.value;
        sitioActividad.innerHTML = '<option value="">Seleccione un sitio</option>'; 

        if (selectedType === "Juegos de Mesas") {
            var option = document.createElement('option');
            option.value = "Jardín del Prado";
            option.text = "Jardín del Prado";
            sitioActividad.appendChild(option);
        } else if (selectedType !== "") {
            sitiosOriginales.forEach(function(sitio) {
                var option = document.createElement('option');
                option.value = sitio;
                option.text = sitio;
                sitioActividad.appendChild(option);
            });
        }
        
    }

    tipoActividad.addEventListener('change', cambiarSitioActividad);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === false) {
            form.classList.add('es correcto');
        } else {
         
            alert('Actividad registrada exitosamente.');
            form.reset();
            form.classList.remove('es correcto');
            cambiarSitioActividad();
        }
    }, false);

   
});
