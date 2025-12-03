/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
        // --- Declaración de Estructura de Datos: Arreglos Bidimensionales ---
        // Representan los precios de distintos servicios por día de la semana
        let preciosSemana1 = [
            ["Masaje Relajante", 120],
            ["Limpieza Facial", 80],
            ["Terapia de Piedras", 150]
        ];

        let preciosSemana2 = [
            ["Masaje Relajante", 120],
            ["Limpieza Facial", 85],
            ["Terapia de Piedras", 150]
        ];

        // --- Uso de Operadores Matemáticos ---
        // Calcular el promedio de precios de la primera semana
        function calcularPromedio(servicios) {
            let suma = 0;
            for (let i = 0; i < servicios.length; i++) {
                suma += servicios[i][1]; // operador +
            }
            return (suma / servicios.length).toFixed(2);
        }

        // --- Función para comparar dos arreglos bidimensionales ---
        function compararPromociones() {
            let iguales = true;
            for (let i = 0; i < preciosSemana1.length; i++) {
                if (preciosSemana1[i][1] !== preciosSemana2[i][1]) {
                    iguales = false;
                    break;
                }
            }

            // --- Estructuras de Control IF-ELSE ---
            let mensaje = "";
            if (iguales) {
                mensaje = "✅ Las promociones y precios de esta semana son iguales a la anterior.";
            } else {
                mensaje = "⚠️ Algunos precios cambiaron respecto a la semana pasada.";
            }

            document.getElementById("resultado").innerText = mensaje;
        }

        // --- Función que usa FOR, WHILE y SWITCH ---
        function mostrarOfertas() {
            let promedio = calcularPromedio(preciosSemana2);
            let texto = "💆 Promedios de precios de la semana: S/" + promedio + "\n";

            // Estructura FOR
            for (let i = 0; i < preciosSemana2.length; i++) {
                texto += `• ${preciosSemana2[i][0]}: S/${preciosSemana2[i][1]}\n`;
            }

            // Estructura WHILE
            let i = 0;
            texto += "\n⭐ Servicios destacados:\n";
            while (i < 2) {
                texto += `- ${preciosSemana2[i][0]}\n`;
                i++;
            }

            // SWITCH – CASE según nivel de precio
            texto += "\n💰 Nivel de precios:\n";
            for (let i = 0; i < preciosSemana2.length; i++) {
                let precio = preciosSemana2[i][1];
                let nivel;
                switch (true) {
                    case (precio <= 100):
                        nivel = "Económico";
                        break;
                    case (precio > 100 && precio <= 140):
                        nivel = "Intermedio";
                        break;
                    default:
                        nivel = "Premium";
                        break;
                }
                texto += `${preciosSemana2[i][0]} → ${nivel}\n`;
            }

            alert(texto);
        }

        // --- Función extra: Permitir al usuario ingresar dos listas de servicios y compararlas ---
        function compararServiciosIngresados() {
            let arr1 = prompt("Ingrese los servicios de la primera lista (ejemplo: masaje,facial,piedras)").split(",");
            let arr2 = prompt("Ingrese los servicios de la segunda lista (ejemplo: masaje,facial,piedras)").split(",");

            let iguales = (arr1.length === arr2.length) && arr1.every((v, i) => v.trim().toLowerCase() === arr2[i].trim().toLowerCase());

            if (iguales) {
                alert("✅ Los servicios ingresados son iguales.");
            } else {
                alert("❌ Los servicios ingresados son diferentes.");
            }
        }


