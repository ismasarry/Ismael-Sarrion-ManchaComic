document.addEventListener('DOMContentLoaded', function () {
    const horasDisponibles = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const tablaHorario = document.getElementById('tablaHorario').querySelector('tbody');

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
                celda.classList.add('active');
            }

            fila.appendChild(celda);
        });

        tablaHorario.appendChild(fila);
    });

    const actividades = JSON.parse(localStorage.getItem('actividades')) || [];

    actividades.forEach(actividad => {
        const dia = actividad.dia;
        const hora = actividad.hora;
        const tipo = actividad.tipo;
        const ubicacion = actividad.ubicacion;

        const celda = document.querySelector(`td[data-dia="${dia}"][data-hora="${hora}"]`);

        if (celda && !celda.classList.contains('disabled')) {
            const boton = document.createElement('button');
            boton.textContent = `${tipo} - ${ubicacion}`;
            boton.classList.add('btn', 'btn-sm', 'btn-primary', 'w-100');
            celda.appendChild(boton);
        }
    });
});
