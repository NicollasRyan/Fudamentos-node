import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQuertParams } from "./utils/extract-query-params.js";

// GET => buscar um recurso no back-end
// POST => cria um recurso no back-end
// PUT => atualizar um recurso no back-end
// PATCH => atualizar uma informação especifica de um recurso no back-end
// DELETE => deletar um recurso no back-end

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQuertParams(query) : {};

    req.params = { ...routeParams.groups };

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
