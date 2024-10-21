document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formularioActividad');
    var tipoActividad = document.getElementById('tipoActividad');
    var sitioActividad = document.getElementById('sitioActividad');
    var diaActividad = document.getElementById('diaActividad');
    var horaActividad = document.getElementById('horaActividad');
    var errorMessage = document.getElementById('error-message');
    var mensajeErrorHorario = document.getElementById('mensaje-error-horario');

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
            sitiosOriginales.forEach(function (sitio) {
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
            horasDisponibles = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        } else if (diaSeleccionado === "Sábado" || diaSeleccionado === "Domingo") {
            horasDisponibles = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        }

        if (horasDisponibles) {
            horasDisponibles.forEach(function (hora) {
                var option = document.createElement('option');
                option.value = hora;
                option.text = hora;
                horaActividad.appendChild(option);
            });
        }
    }

    function validarActividadNueva(actividad) {
        var actividades = JSON.parse(localStorage.getItem('actividades')) || [];
        var juegosMesaCount = 0;

        for (var i = 0; i < actividades.length; i++) {
            var act = actividades[i];

            if (act.dia === actividad.dia && act.hora === actividad.hora) {
                if (act.tipo === "Juegos de Mesas" && actividad.tipo === "Juegos de Mesas") {
                    juegosMesaCount++;
                    if (juegosMesaCount >= 5) {
                        mensajeErrorHorario.textContent = 'No puede haber más de 5 juegos de mesa el mismo día a la misma hora.';
                        mensajeErrorHorario.style.display = 'block';
                        return false;
                    }
                } else if (act.tipo !== "Juegos de Mesas" && actividad.tipo === "Juegos de Mesas") {
                    continue; 
                } else {
                    mensajeErrorHorario.textContent = 'No se puede registrar esta actividad ya que hay otra el mismo dia y a la misma hora.';
                    mensajeErrorHorario.style.display = 'block';
                    return false;
                }
            }
        }
        return true;
    }

    diaActividad.addEventListener('change', actualizarHoras);
    tipoActividad.addEventListener('change', cambiarSitioActividad);

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        errorMessage.style.display = 'none';
        mensajeErrorHorario.style.display = 'none';
        mensajeErrorHorario.textContent = '';

        if (form.checkValidity() === false) {
            errorMessage.textContent = 'Por favor, complete todos los campos requeridos correctamente.';
            errorMessage.style.display = 'block';
        } else {
            var actividad = {
                tipo: tipoActividad.value,
                ubicacion: sitioActividad.value, 
                dia: diaActividad.value,
                hora: horaActividad.value
            };
            

            if (!validarActividadNueva(actividad)) {
                return; 
            }

            var actividades = JSON.parse(localStorage.getItem('actividades')) || [];
            actividades.push(actividad);
            localStorage.setItem('actividades', JSON.stringify(actividades));

            window.location.href = '../public/schedule.html';
        }
    }, false);
});
