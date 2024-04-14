import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Cookies from 'js-cookie';

function Login() {
    const [usernameoremail, setUsernameoremail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const showToast = (message) => {
        Toastify({
            text: message,
            duration: 3000,
            newWindow: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #1c9cf3, #1c9cf3)",
            },
        }).showToast();
    };

    useEffect(() => {
        if(Cookies.get('accountPrivateToken')) {
            navigate('/account/dashboard');
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            showToast("A senha precisa ter pelo menos 8 caracteres.");
            return;
        }

        if (usernameoremail.length < 6) {
            showToast("O nome de usuário precisa ter pelo menos 6 caracteres.");
            return;
        }

        if (!usernameoremail) {
            showToast("Email inválido!");
            return;
        }

        try {
            const response = await fetch('http://144.217.158.77:4000/api/v3/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usernameoremail,
                    password,
                }),
            });
            
            const data = await response.json()

            if(!data.error) {
                //showToast(data.message)
                Cookies.set('accountPrivateToken', data.accountToken)
                navigate('/account/dashboard');
            } else {
                showToast(data.message)
            }
            
        } catch (error) {
            console.error('Erro ao enviar requisição:', error);
            showToast("Erro interno do servidor.")
        }
    };
    return (
        <>
            <nav>
                <ul class="meio">
                    <li><a href='/'>Início</a></li>
                    <li><a href='/plugins'>Plugins</a></li>
                    <li><a href='/termos'>Termos</a></li>
                </ul>
                <ul class="direita">
                    <li class="buttonRegister"><a href='/account/register'>Register</a></li>
                    <button class="buttonLogin"><a href='/account/login'>Login</a></button>
                </ul>
            </nav>

            <div className="containerRegister">
                <div className="cardRegister">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="usernameoremail">Usuário ou Email:</label>
                            <input
                                type="text"
                                id="usernameoremail"
                                name="usernameoremail"
                                value={usernameoremail}
                                onChange={(e) => setUsernameoremail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Senha:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>

            <footer className="footer">
                <p>AntaresPlugins © 2024</p>
            </footer>
        </>
    );
}

export default Login;
