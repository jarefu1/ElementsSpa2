/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */



        let servicioSeleccionado = null;
        let precioBase = 0;

        // Función para seleccionar el servicio
        function seleccionarServicio(nombre, precio) {
            servicioSeleccionado = nombre;
            precioBase = precio;
            document.getElementById("resultadoCalculo").innerHTML = `
                <p>Has seleccionado: <strong>${nombre}</strong> (Precio base: S/ ${precio})</p>
            `;
        }

        // Función para calcular tiempo y costo final
        function calcularDuracion(event) {
            event.preventDefault();

            if (!servicioSeleccionado) {
                alert("Por favor selecciona primero un servicio.");
                return;
            }

            let entrada = document.getElementById("horaEntrada").value;
            let salida = document.getElementById("horaSalida").value;

            if (!entrada || !salida) {
                alert("Completa ambas horas.");
                return;
            }

            // Convertir horas a minutos
            let [h1, m1] = entrada.split(":").map(Number);
            let [h2, m2] = salida.split(":").map(Number);

            let minutosEntrada = h1 * 60 + m1;
            let minutosSalida = h2 * 60 + m2;

            // Validar orden
            if (minutosSalida <= minutosEntrada) {
                alert("La hora de salida debe ser posterior a la de entrada.");
                return;
            }

            // Calcular duración
            let duracion = minutosSalida - minutosEntrada;
            let horas = Math.floor(duracion / 60);
            let minutos = duracion % 60;

            // Uso de operador matemático y control condicional
            let costoFinal = precioBase;

            if (duracion > 60) {
                // Si pasa de 1 hora, se cobra un adicional de S/20 por cada media hora extra
                let extra = Math.ceil((duracion - 60) / 30) * 20;
                costoFinal += extra;
            }

            // Mostrar resultado
            document.getElementById("resultadoCalculo").innerHTML = `
                <p>🧘‍♀️ Servicio: <strong>${servicioSeleccionado}</strong></p>
                <p>⏱ Duración total: <strong>${horas}h ${minutos}min</strong></p>
                <p>💵 Costo final: <strong>S/ ${costoFinal.toFixed(2)}</strong></p>
            `;
        }