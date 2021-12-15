import React from "react";
import { useHistory } from "react-router-dom";

export default function EmprestimoEditar() {
  const history = useHistory();
  const handleClickVoltar = () => {
    history.push("/bibliotecariaconsultaemp");
  };
  return (
    <div className="auth-inner">
      <hr />
      <h2>Não implementado!</h2>
      <hr />
      <button className="btn btn-primary btn-sm" onClick={handleClickVoltar}>
        Voltar
      </button>
    </div>
  );
}
