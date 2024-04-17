// Función para mostrar un mensaje
function mostrar_mensaje(m) {
    // Mostrar el mensaje recibido
    document.getElementById("velo").style.display = "flex";
    document.getElementById("mensaje").innerHTML = m;

    // Crear los botones adicionales
    var botonMenu = document.createElement("button");
    botonMenu.textContent = "Volver al Menú";
    botonMenu.onclick = function () {
        window.location.href = "login.html"; // Redirigir al usuario al menú principal
    };

    var botonScoreboard = document.createElement("button");
    botonScoreboard.textContent = "Ir a la Tabla de Puntuación";
    botonScoreboard.onclick = function () {
        window.location.href = "scoreboard.html"; // Redirigir al usuario a la tabla de puntuación
    };

    // Agregar los botones al mensaje
    document.getElementById("mensaje").appendChild(botonMenu);
    document.getElementById("mensaje").appendChild(botonScoreboard);
}

// Función para actualizar la visualización del crédito
function actualizar() {
    // Reducir el crédito en 1 por cada tirada
    credito--;

    // Actualizar la visualización del crédito
    document.getElementById("dinero").innerHTML = credito;
    if (credito < 1) {
        credito = 12;
        mostrar_mensaje("<b>GAME OVER</b>");
    }
}

// Función que se ejecuta cuando la ventana se carga completamente
window.onload = inicio;

// Variable para almacenar el crédito inicial, se inicializa con un valor de 30
var credito = 31;

// Arreglo que contiene las rutas de las imágenes disponibles
var imagenes = ["7.png", "cereza.png", "naranja.png", "sandia.png", "moneda.png", "palta.png", "fresa.png"];

// Arreglo para almacenar los números actuales obtenidos en cada tirada
var numeros_actuales = [];

// Arreglo para almacenar la puntuación de cada ventana
var puntuacion_ventanas = [0, 0, 0];

// Variable para almacenar la puntuación total acumulada
var puntuacion_total_acumulada = 0;

// Variable para controlar si el juego está activo o no
var activos = false;

// Función de inicio que se ejecuta al cargar la ventana
function inicio() {
    // Asignación de eventos a los elementos correspondientes
    document.getElementById("tirar").onclick = lanzar_inicio;
    document.getElementById("cruz").onclick = cerrar;

    // Asignar eventos a los botones de tirar de cada ventana
    document.getElementById("tirar_ventana1").onclick = lanzar_ventana1;
    document.getElementById("tirar_ventana2").onclick = lanzar_ventana2;
    document.getElementById("tirar_ventana3").onclick = lanzar_ventana3;

    // Actualización de la visualización
    actualizar();
}

// Función para lanzar los números al inicio del juego
function lanzar_inicio() {
    if (credito > 1) { // Cambio aquí para restar 2 créditos en lugar de 1
        // Restar dos créditos
        credito -= 2;
        // Activar el juego
        activos = true;
        numeros_actuales = [];
        for (let k = 0; k < document.getElementsByClassName("boton").length; k++) {
            numeros_actuales.push(escoger_numero());
            mostrar_imagen(k, numeros_actuales[k]);
        }
        comparar();
        // Aumentar la puntuación total acumulada después de lanzar los números en las tres ventanas
        puntuacion_total_acumulada += puntuacion_ventanas.reduce((total, puntuacion) => total + puntuacion, 0);
        // console.log(puntuacion_total_acumulada);
        // Actualizar la visualización
        actualizar();
        actualizarPuntuacion();
    }
}

// Función para lanzar los números en la ventana 1, 2 y 3 al mismo tiempo
function lanzar_ventanas() {
    if (credito > 0) {
        // Restar un crédito
        credito--;
        // Activar el juego
        activos = true;
        numeros_actuales = [];
        for (let k = 0; k < 3; k++) {
            numeros_actuales.push(escoger_numero());
            mostrar_imagen(k, numeros_actuales[k]);
        }
        comparar();
        // Aumentar la puntuación total acumulada
        puntuacion_total_acumulada += puntuacion_ventanas.reduce((total, puntuacion) => total + puntuacion, 0);
        // console.log(puntuacion_total_acumulada);
        // Actualizar la visualización
        actualizar();
    }
}

// Función para lanzar los números en la ventana 1
function lanzar_ventana1() {
    lanzar_uno(0); // Ventana 1
    actualizarPuntuacion();

}

// Función para lanzar los números en la ventana 2
function lanzar_ventana2() {
    lanzar_uno(1); // Ventana 2
    actualizarPuntuacion();

}

// Función para lanzar los números en la ventana 3
function lanzar_ventana3() {
    lanzar_uno(2); // Ventana 3
    actualizarPuntuacion();

}

// Función para lanzar un número al hacer clic en un botón individual
function lanzar_uno(indice_ventana) {
    console.log("Lanzando un número en la ventana", indice_ventana + 1);
    if (activos && credito > 0) {
        numeros_actuales[indice_ventana] = escoger_numero();
        mostrar_imagen(indice_ventana, numeros_actuales[indice_ventana]);
        comparar(indice_ventana); // Llamar a comparar solo para la ventana actual
        // Decrementar el crédito por cada tirada
        credito--;
        // Mostrar el crédito actualizado
        document.getElementById("dinero").innerHTML = credito;
        // Aumentar el crédito en 1 si aparece la imagen de la moneda
        if (numeros_actuales[indice_ventana] === 4) {
            credito++;
            // Mostrar el crédito actualizado
            document.getElementById("dinero").innerHTML = credito;
        }
        // Actualizar la puntuación total acumulada
        puntuacion_total_acumulada += puntuacion_ventanas[indice_ventana];
        // console.log(puntuacion_total_acumulada);
        // Mostrar la puntuación total acumulada
        document.getElementById("puntuacion-usuario").innerHTML = puntuacion_total_acumulada;
    }
}

// Función para escoger un número aleatorio
function escoger_numero() {
    var azar = Math.floor(Math.random() * imagenes.length);
    return azar;
}

// Función para mostrar la imagen correspondiente en una ventana
function mostrar_imagen(num, im) {
    document.getElementsByClassName("imagen")[num].getElementsByTagName("img")[0].src = "img/" + imagenes[im];
    // Llamar a la función comparar después de cambiar la imagen en la ventana
    comparar(num);
}

// Función para comparar los números y calcular la puntuación
function comparar(indice_ventana) {
    // Restablecer la puntuación de la ventana actual
    let puntuacion = 0;
    let conteo = {}; // Conteo de números en la ventana actual
    let numeros_contados = {}; // Números ya contados en todas las ventanas

    // Contar la cantidad de veces que aparece cada número en la ventana actual
    for (let i = 0; i < numeros_actuales.length; i++) {
        if (i === indice_ventana) {
            let num = numeros_actuales[i];
            if (conteo[num] === undefined) {
                conteo[num] = 1;
            } else {
                conteo[num]++;
            }
        }
        // Llevar un registro de los números contados en todas las ventanas
        if (numeros_contados[numeros_actuales[i]] === undefined) {
            numeros_contados[numeros_actuales[i]] = true;
        }
    }

    // Calcular la puntuación de la ventana actual
    for (let numero in conteo) {
        switch (numero) {
            case '0': // 7
                puntuacion += 5000 * conteo[numero];
                break;
            case '3': // sandia
                puntuacion += 4000 * conteo[numero];
                break;
            case '5': // palta
                puntuacion += 3000 * conteo[numero];
                break;
            case '2': // naranja
                puntuacion += 2000 * conteo[numero];
                break;
            case '6': // fresa
                puntuacion += 1000 * conteo[numero];
                break;
            case '1': // cereza
                puntuacion += 500 * conteo[numero];
                break;
            case '4': // moneda
                // Si el número ya fue contado en otra ventana, no sumar su puntuación
                puntuacion += (numeros_contados[numero] ? 0 : (100 * conteo[numero]) + conteo[numero]);
                break;
        }
    }

    // Triplicar la puntuación y luego multiplicar por dos si un número se repite tres veces
    for (let numero in conteo) {
        if (conteo[numero] === 3) {
            puntuacion *= 3;
            puntuacion *= 2;
            break;
        }
    }

    // Actualizar la puntuación de la ventana actual
    puntuacion_ventanas[indice_ventana] = puntuacion;
}

// Función para cerrar el mensaje
function cerrar() {
    document.getElementById("velo").style.display = "none";
}

// Función para obtener el ID del usuario del token JWT
function getUserIdFromCredentials(username, email) {
    $.ajax({
        url: 'https://casinoapp.bsite.net/api/Usuarios/',
        method: "GET",
        contentType: "application/json",
        data: JSON.stringify({ Username: username, Email: email }),
        success: function (response) {
            const userId = response.Id;
            console.log('ID del usuario:', userId);
            // Aquí puedes llamar a la función para actualizar los datos del usuario
            updateUserData(userId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al obtener el ID del usuario:", textStatus, errorThrown);
        },
    });
}

// Función para actualizar los datos del usuario
function updateUserData(userId) {

    const usuario = JSON.parse(localStorage.getItem('user'));
    const loginuserId = usuario.Id;

    const updateData = {
        Puntuacion: puntuacion_total_acumulada,
    };

    $.ajax({
        url: 'https://localhost:44327/api/Usuarios?id=' + loginuserId +'&puntuacion=' + puntuacion_total_acumulada,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updateData),
        success: function () {
            usuario.puntuacion = puntuacion_total_acumulada;
            console.log('Puntuación actualizada:', puntuacion_total_acumulada);

            localStorage.setItem('user', JSON.stringify(usuario));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error al actualizar los datos del usuario:", textStatus, errorThrown);
        },
    });
}


function actualizarPuntuacion() {
    // Mostrar la puntuación total acumulada
    document.getElementById("puntuacion-usuario").innerHTML = puntuacion_total_acumulada;
    // console.log(puntuacion_total_acumulada);

    //obtener usuario del local storage
    var usuario = JSON.parse(localStorage.getItem('user'));
    
    //verificar si la puntación es mayor a la que ya tiene el usuario
    if (usuario.Puntuacion < puntuacion_total_acumulada) {
        // console.log(puntuacion_total_acumulada);
        // actualizar en la base de datos
        
            // Capturar los valores del formulario
            // var userType = $('#user-type').val();
          
            // Construir el objeto con los datos del formulario
            var formUpdateUserData = {
                Puntuacion: puntuacion_total_acumulada,
              // type: userType
            };
            console.log(formUpdateUserData);
            updateUserData(formUpdateUserData);
        
    }

}
