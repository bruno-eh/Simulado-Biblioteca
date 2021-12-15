import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./component/Login";
import PerfilBibli from "./component/PefilBibli";
import PerfilAluno from "./component/PerfilAluno";
import LivrosCadastrar from "./component/LivroCadastrar";
import AlunoConsultaEmp from "./component/AlunoConsultaEmp";
import BibliotecariaConsultaEmp from "./component/BibliotecariaConsultaEmp";
import EmprestimoEditar from "./component/EmprestimoEditar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/bibliotecaria" component={PerfilBibli} />
          <Route exact path="/aluno" component={PerfilAluno} />
          <Route exact path="/alunoconsultaemp" component={AlunoConsultaEmp} />
          <Route
            exact
            path="/bibliotecariaconsultaemp"
            component={BibliotecariaConsultaEmp}
          />
          <Route exact path="/livros" component={LivrosCadastrar} />
          <Route
            exact
            path="/bibliotecariaconsultaemp/editar/:idEmprestimo"
            component={EmprestimoEditar}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
