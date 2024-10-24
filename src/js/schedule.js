document.addEventListener('DOMContentLoaded', function () {
    const horasDisponibles = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const tablaHorario = document.getElementById('tablaHorario').querySelector('tbody');
    const mensajeError = document.getElementById('mensaje-error');

    horasDisponibles.forEach(hora => {
        const fila = document.createElement('tr');

        const celdaHora = document.createElement('td');
        celdaHora.textContent = hora;
        fila.appendChild(celdaHora);

        ["Viernes", "Sábado", "Domingo"].forEach(dia => {
            const celda = document.createElement('td');
            celda.setAttribute('data-dia', dia);
            celda.setAttribute('data-hora', hora);

            if (dia === "Viernes" && ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].includes(hora)) {
                celda.classList.add('disabled');
            } else {
                celda.classList.add('active', 'drop-zone');
            }

            fila.appendChild(celda);
        });

        tablaHorario.appendChild(fila);
    });

    const actividades = JSON.parse(localStorage.getItem('actividades')) || [];

    function crearBotonActividad(actividad) {
        const boton = document.createElement('button');
        boton.textContent = `${actividad.tipo} - ${actividad.ubicacion}`;
        boton.classList.add('btn', 'btn-sm', 'btn-primary', 'w-100', 'draggable');
        boton.setAttribute('draggable', true);
        boton.dataset.tipo = actividad.tipo;
        boton.dataset.dia = actividad.dia;
        boton.dataset.hora = actividad.hora;
        boton.dataset.ubicacion = actividad.ubicacion;
        return boton;
    }

    actividades.forEach(actividad => {
        const celda = document.querySelector(`td[data-dia="${actividad.dia}"][data-hora="${actividad.hora}"]`);
        if (celda && !celda.classList.contains('disabled')) {
            const boton = crearBotonActividad(actividad);
            celda.appendChild(boton);
        }
    });

    document.addEventListener('dragstart', function (e) {
        if (e.target.classList.contains('draggable')) {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                tipo: e.target.dataset.tipo,
                dia: e.target.dataset.dia,
                hora: e.target.dataset.hora,
                ubicacion: e.target.dataset.ubicacion
            }));
            e.target.classList.add('dragging');
        }
    });

    document.addEventListener('dragend', function (e) {
        if (e.target.classList.contains('draggable')) {
            e.target.classList.remove('dragging');
        }
    });

    document.querySelectorAll('.drop-zone').forEach(celda => {
        celda.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        celda.addEventListener('drop', function (e) {
            e.preventDefault();
            mensajeError.textContent = ''; 
            const actividadData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const diaDestino = this.getAttribute('data-dia');
            const horaDestino = this.getAttribute('data-hora');

            if (validarMovimiento(actividadData, diaDestino, horaDestino)) {
                const actividades = JSON.parse(localStorage.getItem('actividades')) || [];
                const indice = actividades.findIndex(actividadExistente => 
                    actividadExistente.dia === actividadData.dia && 
                    actividadExistente.hora === actividadData.hora && 
                    actividadExistente.tipo === actividadData.tipo
                );
                if (indice !== -1) {
                    actividades.splice(indice, 1);
                }
                actividadData.dia = diaDestino;
                actividadData.hora = horaDestino;
                actividades.push(actividadData);
            
                localStorage.setItem('actividades', JSON.stringify(actividades));
            
                window.location.reload();
            }
        });
    });

    function validarMovimiento(actividad, diaDestino, horaDestino) {
        const actividades = JSON.parse(localStorage.getItem('actividades')) || [];
        let juegosMesaCount = 0;

        for (const actividadExistente of actividades) {
            if (actividadExistente.dia === diaDestino && actividadExistente.hora === horaDestino) {
                if (actividad.tipo === "Juegos de Mesas") {
                    if (actividadExistente.tipo !== "Juegos de Mesas") {
                        mensajeError.textContent = '¡¡¡No se puede registrar esta actividad, ya que hay otra el mismo día y a la misma hora!!!';
                        mensajeError.style.display = 'block';
                        return false;
                    }
                    juegosMesaCount++;
                    if (juegosMesaCount >= 5) {
                        mensajeError.textContent = '¡¡¡No puede haber más de 5 juegos de mesa el mismo día a la misma hora!!!';
                        mensajeError.style.display = 'block'; 
                        return false;
                    }
                } else {
                    mensajeError.textContent = '¡¡¡No se puede registrar esta actividad, ya que hay otra el mismo día y a la misma hora!!!';
                    mensajeError.style.display = 'block'; 
                    return false;
                }
            }
        }

        return true;
    }
});
