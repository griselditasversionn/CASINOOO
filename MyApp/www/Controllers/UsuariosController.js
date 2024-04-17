// Función para obtener todos los usuarios
function getAllUsers() {
    $.ajax({
        url: allUsers_route,
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.log(response); // Manejar la respuesta, por ejemplo, mostrarla en la interfaz de usuario
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown); // Manejar errores
        }
    });   
}

// Función para obtener un usuario por ID
function getUserById(id) {
    $.ajax({
        url: singleUser_route.replace('{id}', id),
        method: 'GET',
        contentType: 'application/json',
        success: function(response) {
            console.log(response); // Manejar la respuesta
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown); // Manejar errores
        }
    });   
}

// Función para actualizar un usuario por ID
function updateUser(id, userData) {
    $.ajax({
        url: updateUser_route.replace('{id}', id),
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function(response) {
            console.log(response); // Manejar la respuesta
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown); // Manejar errores
        }
    });   
}

// Función para crear un nuevo usuario
function createUser(userData) {
    // Verificar que los campos no estén vacíos
    if (!userData.nombre || !userData.correo) {
        alert("Por favor, completa todos los campos.");
        return; // Detener la ejecución si los campos están vacíos
    }

    $.ajax({
        url: createUser_route,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function(response) {
            console.log(response); // Manejar la respuesta
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown); // Manejar errores
        }
    });   
}


// Función para eliminar un usuario por ID
function deleteUser(id) {
    $.ajax({
        url: deleteUser_route.replace('{id}', id),
        method: 'DELETE',
        success: function(response) {
            console.log(response); // Manejar la respuesta
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown); // Manejar errores
        }
    });   
}


function deployRecords()
{
    $(document).ready(function(){
        // Realizar solicitud AJAX para obtener los datos de la tabla de puntuación
         $.ajax({
             url: "https://casinoapp.bsite.net/api/Usuarios",
             method: 'GET',
             contentType: 'application/json',
             success: function(response) {
                 // Llenar la tabla con los datos recibidos
                 response.forEach(function(user) {
                     $("#scoreboard-body").append("<tr><td>" + user.Nombre + "</td><td>" + user.Puntuacion + "</td></tr>");
                 });
             },
             error: function(jqXHR, textStatus, errorThrown) {
                 console.error('Error:', textStatus, errorThrown); // Manejar errores
             }
         });
     });
}
function login(userData) {
    $.ajax({
        url: "https://localhost:44327/api/users/login",
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function(response) {
            // Si el inicio de sesión es exitoso, redirigir al usuario a la página de reglas
            window.location.href = "reglas.html";
            console.log('Dentro de la funcion')
            //verificar si el usuario ya existe en el almacenamiento local
            var user = JSON.parse(localStorage.getItem('user'));
            
            //si el usuario existe, eliminarlo del almacenamiento local
            if (user) {
                localStorage.removeItem('user');
            }

            // Guardar el usuario en el almacenamiento local
            localStorage.setItem('user', JSON.stringify(response));
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            alert("Error al iniciar sesión. Por favor, verifica tus credenciales.");
        }
    });   
}


function sendUpdateLoginData() {
    // Capturar los valores del formulario

    var UserName = $("#username").val();
    var UserEmail = $("#email").val();
    // var userType = $('#user-type').val();
  
    // Construir el objeto con los datos del formulario
    var formUpdateUserData = {
      Nombre: UserName,
      Correo: UserEmail,
      // type: userType
    };
    console.log(formUpdateUserData);
    login(formUpdateUserData);
  }

