const http = require("http");
const routes = require("./routes");
// this file is not accessible from outside.

// using http
const server = http.createServer(routes.handler);

server.listen(3000);
