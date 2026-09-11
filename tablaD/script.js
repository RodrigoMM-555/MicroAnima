// fetch() solicita el archivo JSON. La ruta es relativa a este HTML,
// por eso busca datos.json dentro de la misma carpeta.
fetch("datos.json")
    // La respuesta HTTP todavía no es el contenido utilizable del JSON.
    // response.json() lo convierte en un array de objetos JavaScript.
    .then(respuesta => respuesta.json())
    // horario contiene los datos del archivo datos.json, por ejemplo:
    // { asignatura: "Programación", dia: 1, hora: 1 }
    .then(horario => {

        // Estos nombres se mostrarán como las columnas de la tabla.
        const dias = [
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes"
        ];

        // Estas horas se mostrarán como las filas de la tabla.
        const horas = [
            "15:00",
            "15:55",
            "16:50",
            "17:45",
            "18:15",
            "19:10",
            "20:05"
        ];

        // html almacenará todo el código HTML de la tabla antes de insertarlo
        // de una sola vez en el elemento <div id="horario">.
        let html = "<table id='tabla-horario' class='tabla-horario'>";

        // -------------------------
        // Construcción de la cabecera
        // -------------------------
        // Abrimos la primera fila de la tabla.
        html += "<tr class='cabecera'>";

        // La primera columna indica la hora de cada fila.
        html += "<th>Hora</th>";

        // forEach() ejecuta la función una vez por cada día.
        // En cada vuelta, "dia" contiene un nombre: Lunes, Martes, etc.
        // Así se crea una columna <th> para cada día.
        dias.forEach(dia => {
            html += `<th>${dia}</th>`;
        });

        // Cerramos la fila de la cabecera.
        html += "</tr>";

        // ----------------------
        // Construcción de las filas
        // ----------------------
        // Este forEach recorre las horas una por una.
        // Cada vuelta crea UNA FILA COMPLETA de la tabla:
        //   - numeroHora: posición de la hora dentro del array, empezando en 0.
        //   - hora: texto de la hora, por ejemplo "08:00".
        //
        // Importante: el JSON guarda las horas como 1, 2 y 3, pero los arrays
        // de JavaScript empiezan a contar desde 0. Por eso más abajo usamos
        // numeroHora + 1 para comparar ambos sistemas de numeración.
        horas.forEach((hora, numeroHora) => {

            // Comenzamos la fila correspondiente a esta hora.
            html += `<tr id="fila-${numeroHora + 1}" class="transitable">`;

            // La primera celda de la fila muestra la hora visible.
            html += `<td>${hora}</td>`;

            // Dentro de cada fila recorremos todos los días.
            // Esto crea una celda para Lunes, otra para Martes, etc.
            // Por tanto, este forEach está dentro del forEach de las horas.
            dias.forEach((dia, numeroDia) => {

                // Si no encontramos ninguna clase para esta combinación de
                // día y hora, la celda se queda vacía.
                let asignatura = "";

                // Buscamos en todos los objetos del JSON la clase que
                // corresponde a la celda actual.
                // Por ejemplo, para Lunes a las 08:00 se busca:
                // dia === 1 y hora === 1.
                horario.forEach(clase => {

                    if (
                        // numeroDia vale 0 para Lunes, 1 para Martes, etc.
                        // Sumamos 1 porque el JSON guarda Lunes como dia: 1.
                        clase.dia === numeroDia + 1 &&
                        // numeroHora vale 0 para "08:00", 1 para "09:00",
                        // etc. También sumamos 1 para coincidir con el JSON.
                        clase.hora === numeroHora + 1
                    ) {
                        // Cuando coinciden el día y la hora, guardamos el
                        // nombre de la asignatura para mostrarlo en la celda.
                        asignatura = clase.asignatura;
                    }

                });

                // Añadimos la celda. Si había una clase coincidente, aparece
                // su nombre; si no, aparece una celda vacía.
                html += `<td>${asignatura}</td>`;
            });

            // Cerramos la fila después de añadir todas sus celdas.
            html += "</tr>";
        });

        // Cerramos la tabla completa.
        html += "</table>";

        // Buscamos el div del HTML y colocamos dentro la tabla generada.
        document.getElementById("horario").innerHTML = html;

        // Esperamos a que la tabla entre en la pantalla antes de mostrar sus
        // filas. Así la animación comienza justo cuando el usuario la ve.
        const tabla = document.getElementById("tabla-horario");
        const filas = tabla.querySelectorAll(".transitable");

        const mostrarFilas = () => {
            filas.forEach((fila, numeroFila) => {
                // Cada fila empieza un poco después que la anterior.
                fila.style.setProperty("--delay", `${numeroFila * 120}ms`);
                fila.classList.add("visible");
            });
        };

        // IntersectionObserver detecta cuándo la tabla es visible en pantalla.
        const observador = new IntersectionObserver((entradas, observer) => {
            if (entradas[0].isIntersecting) {
                mostrarFilas();
                observer.disconnect();
            }
        }, { threshold: 0.15 });

        observador.observe(tabla);
    });