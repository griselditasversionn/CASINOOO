// Declare environment
const local_server = "https://localhost:44327/api";     // Write localhost and port
const public_server = "https://casinoapp.bsite.net/api";                               // Write WEB API public address
// const local_sources = "/www";                           // Write App local resources

const env = local_server;                      // Select your environment (local or public server)

// Users API
const allUsers_route = env + "/Usuarios";               // GET api/Usuarios
const singleUser_route = env + "/Usuarios/{id}";        // GET api/Usuarios/{id}
const updateUser_route = env + "/Usuarios/{id}";        // PUT api/Usuarios/{id}
const createUser_route = env + "/Usuarios";             // POST api/Usuarios
const deleteUser_route = env + "/Usuarios/{id}";        // DELETE api/Usuarios/{id}
const login_route = env + "/Usuarios/Login";            // POST api/Usuarios/Login
const updateScore_route = env + "/Usuarios/addUser?id=";        // PUT api/Usuarios/addUser?id=
