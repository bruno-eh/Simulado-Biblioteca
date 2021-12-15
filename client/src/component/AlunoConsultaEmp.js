import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

export default function AlunoConsultaEmp() {
  useEffect(() => {
    getEmprestimos();
  }, []);

  const history = useHistory();
  const [titulo, setTitulo] = useState("");
  const [livro, setLivro] = useState([]);

  const logout = () => {
    history.push("/");
  };

  const getEmprestimos = async () => {
    const response = await axios.get("http://localhost:3001/alunoconsultaemp");
    setLivro(response.data);
  };

  const getLivroEmprestimos = async () => {
    const response = await axios.get(
      `http://localhost:3001/alunoconsultaemp/${titulo}`
    );
    setLivro(response.data);
  };

  return (
    <div className="auth-inner-aluno">
      <h3>Consulta de empréstimos</h3>
      <hr />
      <button className="btn btn-primary" onClick={getEmprestimos}>
        Consultar Empréstimos
      </button>
      <button
        className="btn btn-primary"
        style={{ marginRight: "5px" }}
        onClick={() => getLivroEmprestimos(titulo)}
      >
        Pesquisar por Título
      </button>
      <input
        className="input"
        type="text"
        placeholder="Digite o livro desejado"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button className="btn btn-primary" onClick={logout}>
        Sair
      </button>
      <hr />
      <div>
        <h3>Livros emprestados</h3>
        <table className="table table-striped align-center">
          <thead>
            <tr>
              <th>Título</th>
              <th>Retirada</th>
              <th>Devolução</th>
            </tr>
          </thead>
          <tbody>
            {livro.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.titulo}</td>
                <td>{moment(emp.dataRetirada).format("DD/MM/YYYY")}</td>
                <td>
                  {moment(emp.dataPrevistaDevolução).format("DD/MM/YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
