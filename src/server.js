import http from "node:http";
import { json } from "./middlewares/json.js";
import { Databese } from "./database.js";

// GET => buscar um recurso no back-end
// POST => cria um recurso no back-end
// PUT => atualizar um recurso no back-end
// PATCH => atualizar uma informação especifica de um recurso no back-end
// DELETE => deletar um recurso no back-end

const database = new Databese();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === "GET" && url === "/users") {
    const users = database.select("users");

    return res.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    const user = {
      id: 1,
      name,
      email,
    };

    database.insert("users", user);
    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
