import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment"; //formatação de campos e tabelas
import { Link } from "react-router-dom";

export default function BibliotecariaConsultaEmp() {
  useEffect(() => {
    getEmprestimos();
  }, []);

  const history = useHistory();
  const [id, setId] = useState("");
  const [livro, setLivro] = useState([]);

  const handleClickVoltar = () => {
    history.push("/bibliotecaria");
  };

  //   const updateEmprestimos = async (e) => {
  //     await axios.patch(`http://localhost:3001/bibliotecariaeditaemp/${id}`, {
  //       codigolivro: codLivro,
  //       matricula: matEstudante,
  //     });
  //     history.push("/bibliotecariaconsultaemp");
  //   };

  const getEmprestimos = async () => {
    const response = await axios.get(
      "http://localhost:3001/bibliotecariaconsultaemp"
    );
    setLivro(response.data);
  };

  const getLivroEmprestimos = async () => {
    const response = await axios.get(
      `http://localhost:3001/bibliotecariaconsultaemp/${id}`
    );
    setLivro(response.data);
    if (livro.length == 0) {
      alert("Aluno não encontrado");
    }
  };

  const deletarEmprestimo = async (id) => {
    const response = await axios.delete(
      `http://localhost:3001/bibliotecariaconsultaemp/${id}`
    );
    getEmprestimos();
  };

  return (
    <div className="auth-inner-aluno">
      <h3>Consulta de empréstimos</h3>
      <hr />
      <button className="btn btn-primary" onClick={getEmprestimos}>
        Consultar todos Empréstimos
      </button>
      <button
        className="btn btn-primary"
        style={{ marginRight: "5px" }}
        onClick={() => getLivroEmprestimos(id)}
      >
        Pesquisar por Aluno
      </button>
      <input
        className="input"
        type="text"
        placeholder="Digite o código do aluno"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button className="btn btn-primary btn-sm" onClick={handleClickVoltar}>
        Voltar
      </button>
      <hr />
      <div>
        <h3>Livros emprestados</h3>
        <table className="table table-striped align-center align-middle">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Título</th>
              <th>Retirada</th>
              <th>Devolução</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              livro.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{emp.nomeCompleto}</td>
                  <td>{emp.titulo}</td>
                  <td>{moment(emp.dataRetirada).format("DD/MM/YYYY")}</td>
                  <td>
                    {moment(emp.dataPrevistaDevolução).format("DD/MM/YYYY")}
                  </td>
                  <td>
                    <Link
                      to={`/bibliotecariaconsultaemp/editar/${emp.codEmprestimo}`}
                      className="btn btn-info btn-sm"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deletarEmprestimo(emp.codEmprestimo)}
                      className="btn-sm btn-danger"
                      style={{ marginLeft: "5px" }}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))
              // emprestimo.map((emp, index) => (
              //     <tr key={emp.id}>
              //         <td>{emp.titulo}</td>
              //         <td>{moment(emp.dataRetirada).format("DD/MM/YYYY")}</td>
              //         <td>{moment(emp.dataPrevistaDevolução).format("DD/MM/YYYY")}</td>
              //     </tr>

              // ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
