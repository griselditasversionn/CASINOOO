// Declare environment
const local_server = "https://localhost:44327/api";     // Write localhost and port
const public_server = "https://casinoapp.bsite.net";                               // Write WEB API public address
// const local_sources = "/www";                           // Write App local resources

const env = public_server;                      // Select your environment (local or public server)

// Users API
const allUsers_route = env + "/Usuarios";               // GET api/Usuarios
const singleUser_route = env + "/Usuarios/{id}";        // GET api/Usuarios/{id}
const updateUser_route = env + "/Usuarios/{id}";        // PUT api/Usuarios/{id}
const createUser_route = env + "/Usuarios";             // POST api/Usuarios
const deleteUser_route = env + "/Usuarios/{id}";        // DELETE api/Usuarios/{id}
