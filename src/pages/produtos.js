import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Cookies from 'js-cookie';

function Produtos() {
    const showToast = (message) => {
        if (document.getElementById('root')) {
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
        }
    };

    const buttonBuy = async (idProduto) => {
        const accountToken = Cookies.get('accountPrivateToken');
        if (!accountToken) {
            showToast("Você precisa estar logado para comprar.");
            return;
        }

        try {
            const response = await fetch('https://144.217.158.77:4001/api/v1/payments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorized': accountToken
                },
                body: JSON.stringify({ idProduto })
            });
            const data = await response.json();

            if (!data.error) {
                showToast(data.message);
                window.open(data.link, '_blank');
            } else {
                showToast(data.message);
            }
        } catch (error) {
            showToast("Erro interno do servidor.");
            console.error('Erro ao enviar requisição:', error);
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

            <div className="container">
                <div className="container2">
                    <div className="card2">
                        <p className="titulo">AntaresZenkai</p>
                        <p style={{color: "#ffffff"}} class="subtitulo">R$ 25</p>
                        <button onClick={() => buttonBuy(1)} className="donate-button">
                            <a className='semtexto'>Comprar</a>
                        </button>
                    </div>
                    <div className="card2">
                        <p className="titulo">AntaresRebirth</p>
                        <p style={{color: "#ffffff"}} class="subtitulo">R$ 25</p>
                        <button onClick={() => buttonBuy(2)} className="donate-button">
                            <a className='semtexto'>Comprar</a>
                        </button>
                    </div>
                </div>
                <div>
                    <iframe src="https://discord.com/widget?id=818843587676602378&theme=dark" width="350" height="418"
                        allowtransparency="true" frameborder="0"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
            </div>

            <footer className="footer2">
                <p>AntaresPlugins © 2024</p>
            </footer>
        </>
    );
}

export default Produtos;
