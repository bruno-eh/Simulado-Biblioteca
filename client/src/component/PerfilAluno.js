import React from "react";
import { useHistory } from "react-router-dom";

export default function PerfilAluno() {
  const history = useHistory();

  const logout = () => {
    history.push("/");
  };

  const AlunoConsultaEmp = () => {
    history.push("/alunoconsultaemp");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>Tela principal - Aluno</h3>
        <div>
          <button className="btn btn-primary" onClick={AlunoConsultaEmp}>
            Consultar Empréstimos
          </button>
        </div>
        <div>
          <button className="btn btn-primary" onClick={logout}>
            Sair do Sistema
          </button>
        </div>
      </div>
    </div>
  );
}
