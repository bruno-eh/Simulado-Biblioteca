const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "simulado_bruno_souza",
});

app.post("/api/login", (req, res) => {
  const { username, password, perfil } = req.body;

  sqlSelect =
    "SELECT * FROM usuario WHERE login = ? AND senha = ? AND perfil = ?";

  db.query(sqlSelect, [username, password, perfil], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length > 0) {
        res.send({
          logged: true,
          perfil: perfil,
        });
      } else {
        res.send({ msg: "User not Found" });
      }
    }
  });
});

app.post("/livros/cadastrar", (req, res) => {
  const { titulo, autor, editora, ano } = req.body;

  sqlSelect =
    "INSERT INTO `livro` (`titulo`, `autor`, `editora`, `ano`) VALUES (?, ?, ?, ?)";

  db.query(sqlSelect, [titulo, autor, editora, ano], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ msg: "Livro cadastrado" });
    }
  });
});

app.get("/alunoconsultaemp", (req, res) => {
  sqlSelect =
    "SELECT * FROM emprestimo LEFT JOIN livro ON emprestimo.codLivro = livro.codLivro";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/alunoconsultaemp/:titulo", (req, res) => {
  const { titulo } = req.params;
  sqlSelect =
    "SELECT * FROM emprestimo LEFT JOIN livro ON emprestimo.codLivro = livro.codLivro WHERE livro.titulo LIKE '%" +
    titulo +
    "%' ";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/bibliotecariaconsultaemp/:id", (req, res) => {
  const { id } = req.params;
  sqlSelect =
    "SELECT * FROM emprestimo LEFT JOIN livro ON emprestimo.codLivro = livro.codLivro LEFT JOIN estudante ON emprestimo.matEstudante = estudante.matricula WHERE emprestimo.matEstudante=" +
    id;

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/bibliotecariaconsultaemp", (req, res) => {
  sqlSelect =
    "SELECT * FROM emprestimo LEFT JOIN livro ON emprestimo.codLivro = livro.codLivro LEFT JOIN estudante ON emprestimo.matEstudante = estudante.matricula";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/bibliotecariaconsultaemp/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  sqlSelect = "delete FROM emprestimo WHERE codEmprestimo=" + id;
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Running on port: 3001");
});
