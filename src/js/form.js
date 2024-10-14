document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formularioActividad');
    var tipoActividad = document.getElementById('tipoActividad');
    var sitioActividad = document.getElementById('sitioActividad');
    var diaActividad = document.getElementById('diaActividad');
    var horaActividad = document.getElementById('horaActividad');
    var errorMessage = document.getElementById('error-message');

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

    function actualizarHoras() {
        var diaSeleccionado = diaActividad.value;
        horaActividad.innerHTML = '<option value="">Seleccione una hora</option>'; 

        let horasDisponibles;

        if (diaSeleccionado === "Viernes") {
            horasDisponibles = ["17h", "18h", "19h", "20h", "21h", "22h"];
        } else if (diaSeleccionado === "Sábado" || diaSeleccionado === "Domingo") {
            horasDisponibles = ["10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "20h", "21h", "22h"];
        }

        if (horasDisponibles) {
            horasDisponibles.forEach(function(hora) {
                var option = document.createElement('option');
                option.value = hora;
                option.text = hora;
                horaActividad.appendChild(option);
            });
        }
    }

    diaActividad.addEventListener('change', actualizarHoras);
    tipoActividad.addEventListener('change', cambiarSitioActividad);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        errorMessage.style.display = 'none'; 
        errorMessage.textContent = ''; 

        if (form.checkValidity() === false) {
            errorMessage.textContent = 'Por favor, complete todos los campos requeridos correctamente.';
            errorMessage.style.display = 'block';
        } else {
            window.location.href = '../public/schedule.html'; 
        }
    }, false);
});
