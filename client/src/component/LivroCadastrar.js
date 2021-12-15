import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function LivrosCadastrar() {
  const history = useHistory();
  const [titulo, setTitulo] = useState([]);
  const [autor, setAutor] = useState([]);
  const [editora, setEditora] = useState("");
  const [ano, setAno] = useState("");

  const handleClickSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/livros/cadastrar", {
      titulo: titulo,
      autor: autor,
      editora: editora,
      ano: ano,
    });
    history.push("/bibliotecaria");
    window.alert("Livro cadastrado com sucesso!");
  };

  const handleClickVoltar = () => {
    history.push("/bibliotecaria");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleClickSubmit}>
          <h3>Cadastro de Livros</h3>
          <hr />
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              name="titulo"
              className="form-control"
              placeholder="titulo"
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Autor</label>
            <input
              type="text"
              className="form-control"
              placeholder="autor"
              onChange={(e) => setAutor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Editora</label>
            <input
              type="text"
              className="form-control"
              placeholder="editora"
              onChange={(e) => setEditora(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Ano</label>
            <input
              type="text"
              className="form-control"
              placeholder="ano"
              onChange={(e) => setAno(e.target.value)}
              required
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              style={{ marginLeft: "-5px" }}
              type="submit"
              className="btn btn-primary"
            >
              Cadastrar
            </button>
            <button
              className="btn btn-secondary"
              onClick={handleClickVoltar}
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
