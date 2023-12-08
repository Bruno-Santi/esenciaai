const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Parsear el cuerpo de las solicitudes a JSON
app.use(bodyParser.json());

// Ruta GET
app.get("/:id", (req, res) => {
  const { id } = req.params;
  const { user } = req.query;
  console.log(id);
  res.json({ message: `PARAMS: ${id} - QUERY: ${user}` });
});

app.get("/", (req, res) => {
  const { user } = req.query;
  console.log("solo query");
  res.json({ message: `QUERY: ${user}` });
});

// Ruta PUT
app.put("/:id", (req, res) => {
  const id = req.params.id;
  const queryParam = req.query.param || "defaultQueryParam";
  const bodyData = req.body.data || "defaultBodyData";
  res.json({
    message: `PUT request. ID: ${id}, Query parameter: ${queryParam}, Body data: ${bodyData}`,
  });
});

// Ruta POST
app.post("/", (req, res) => {
  const query = req.query;
  const body = req.body;
  // res.status(404).json("se complico");
  res.json({ query, body });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
