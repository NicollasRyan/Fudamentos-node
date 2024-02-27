import http from "node:http";

// GET => buscar um recurso no back-end
// POST => cria um recurso no back-end
// PUT => atualizar um recurso no back-end
// PATCH => atualizar uma informação especifica de um recurso no back-end
// DELETE => deletar um recurso no back-end

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "Jonh Doe",
      email: "jonh@gmail.com",
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
