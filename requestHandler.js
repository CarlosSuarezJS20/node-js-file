// const fs = require("fs");
function requestHandler(req, res) {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Logging System</title></head>");
    res.write(`<body>
            <h1>Welcome user</h1>
            <form action="/create-user" method="POST">
            <input type="text" name="message" placeholder="username"/>
            <button type="submit">send</button>
            </form> 
          </body>`);
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Logging System</title></head>");
    res.write(`<body>
            <h1>List of users</h1>
            <ul>
             <li>User 1</li>
             <li>User 2</li>
             <li>User 2</li>
            </ul>
          </body>`);
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method === "POST") {
    // buffer to hold chunks of data and do something\
    const reqBody = [];

    req.on("data", (chunk) => {
      reqBody.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(reqBody).toString();
      const message = parsedBody.split("=")[1];

      res.writeHead(200, {
        location: "/",
      });

      console.log(message);

      // - example of a filing system
      // // fs.writeFileSync("message.txt", message); //blocks execution until it creates the file
      // fs.writeFile("message.txt", message, (err) => {
      //   res.writeHead(302, {
      //     location: "/",
      //   });
      //   return res.end(); // end here
      // });
    });
  }

  return res.end();
}
module.exports = {
  handler: requestHandler,
};
