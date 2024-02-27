import http from "node:http";

// GET => buscar um recurso no back-end
// POST => cria um recurso no back-end
// PUT => atualizar um recurso no back-end
// PATCH => atualizar uma informação especifica de um recurso no back-end
// DELETE => deletar um recurso no back-end

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res.end("Listagem de usuario");
  }

  if (method === "POST" && url === "/users") {
    return res.end("Criação de usuario");
  }

  return res.end("Hello World");
});

server.listen(3333);
