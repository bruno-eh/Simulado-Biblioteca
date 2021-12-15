import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [perfil, setPerfil] = useState();
    const history = useHistory();

    const handleClickSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/login', {
            username: username,
            password: password,
            perfil: perfil,
        })
            .then((response) => {
                if (response.data.logged && perfil === '1') {
                    history.push('/bibliotecaria');
                } else if (response.data.logged && perfil === '2') {
                    history.push('/aluno');
                }
                else {
                    history.push('/');
                    window.alert("Usuário não encontrado!");
                }
            })
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <form onSubmit={handleClickSubmit}>
                    <h3>Biblioteca - Simulado</h3>

                    <div className="form-group">
                        <label>Usuário</label>
                        <input type="text" name="username" className="form-control" placeholder="Login" onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Senha</label>
                        <input type="password" className="form-control" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="perfil" value="2" id="aluno" onChange={(e) => setPerfil(e.target.value)} required />
                        <label className="form-check-label" htmlFor="aluno">
                            Aluno
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="perfil" value="1" id="bibliotecario" onChange={(e) => setPerfil(e.target.value)} />
                        <label className="form-check-label" htmlFor="bibliotecario">
                            Bibliotecária(o)
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                </form>
            </div>
        </div>
    );
}