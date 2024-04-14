import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Cookies from 'js-cookie';

function Dashboard() {
    const [ip, setIp] = useState('');
    const [username, setUsername] = useState('');
    const [usersWithPlugins, setUsersWithPlugins] = useState(null);
    const [mounted, setMounted] = useState(true);
    const [remainingTime, setRemainingTime] = useState(0);
    const navigate = useNavigate();

    const handleLogout = () => {
        showToast("Você saiu da sua conta com sucesso.")
        Cookies.remove('accountPrivateToken');
        navigate('/account/login');
    };

    const handleRegisterIP = async (e) => {
        e.preventDefault();

        const lastIPChangeTime = Cookies.get('lastIPChangeTime');
        if (lastIPChangeTime) {
            const elapsedTime = Math.floor((Date.now() - parseInt(lastIPChangeTime)) / 1000);
            if (elapsedTime < 60) {
                showToast(`Você precisa esperar ${60 - elapsedTime} segundos para mudar o IP novamente.`);
                return;
            }
        }

        try {
            const response = await fetch('http://144.217.158.77:4000/api/v3/account/registerip', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorized': Cookies.get('accountPrivateToken')
                },
                body: JSON.stringify({ ip })
            });

            const data = await response.json();

            if (!data.error) {
                showToast(data.message);
                Cookies.set('lastIPChangeTime', Date.now());
            } else {
                showToast(data.message);
            }
        } catch (error) {
            showToast("Erro interno do servidor.");
            console.error('Erro ao enviar requisição:', error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const lastIPChangeTime = Cookies.get('lastIPChangeTime');
            if (lastIPChangeTime) {
                const elapsedTime = Math.floor((Date.now() - parseInt(lastIPChangeTime)) / 1000);
                setRemainingTime(Math.max(0, 60 - elapsedTime));
            } else {
                setRemainingTime(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch('http://144.217.158.77:4000/api/v3/account/dashboard', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorized': Cookies.get('accountPrivateToken')
                    }
                });

                const data = await response.json();

                if (!data.error) {
                    showToast(data.message);
                    setUsername(data.info.username)
                    setUsersWithPlugins(data.info)
                } else {
                    showToast(data.message);
                    navigate('/account/login');
                }

                if (data.token) {
                    Cookies.remove('accountPrivateToken');
                }

            } catch (error) {
                showToast("Erro interno do servidor.")
                navigate('/account/login');
                console.error('Erro ao enviar requisição:', error);
            }
        };

        const token = Cookies.get('accountPrivateToken');
        if (token && mounted) {
            fetchDashboardData();
        } else if (!token) {
            navigate('/account/login');
        }

        return () => {
            setMounted(false);
        };
    }, [navigate, mounted]);

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

    const buttonDownload = async (key) => {
        try {
            const response = await fetch(`http://144.217.158.77:5000/api/v1/downloads/plugins=${key.toLowerCase()}.jar`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorized': Cookies.get('accountPrivateToken')
                }
            });

            // Verifica se o download foi bem-sucedido
            if (!response.ok) {
                throw new Error('Erro ao baixar o plugin.');
            }

            // Cria um objeto de URL temporário para o download do plugin
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));

            // Cria um link para o download do plugin e simula o clique nele
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${key.toLowerCase()}.jar`);
            document.body.appendChild(link);
            link.click();

            // Remove o link após o download
            document.body.removeChild(link);

            showToast('Plugin baixado com sucesso.');
        } catch (error) {
            showToast("Erro ao baixar o plugin.");
            console.error('Erro ao enviar requisição:', error);
        }
    };


    return (
        <>
            <nav>
                <ul className="meio">
                    <li><a href='/'>Início</a></li>
                    <li><a href='/plugins'>Plugins</a></li>
                    <li><a href='/termos'>Termos</a></li>
                </ul>
                <ul className="direita">
                    <li><a>{username}</a></li>
                    <button onClick={handleLogout} className="buttonLogin">Logout</button>
                </ul>
            </nav>

            <div className="container">
                <div className="container2">
                    {usersWithPlugins && Object.keys(usersWithPlugins).map((key) => {
                        if (key.startsWith('Antares') && key !== 'AntaresCore' && usersWithPlugins[key]) {
                            return (
                                <div key={key} className="card2">
                                    <p className="titulo">{key}</p>
                                    <button onClick={() => buttonDownload(key)} className="donate-button"><a className='semtexto'>Baixar</a></button>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>


                <div>
                    <div className="containerIP">
                        <div className="cardIP">
                            <form onSubmit={handleRegisterIP}>
                                <div>
                                    <label htmlFor="ip">IP do servidor:</label>
                                    <input
                                        placeholder='Exemplo: 179.178.85.216:25565'
                                        type="text"
                                        id="ip"
                                        name="ip"
                                        value={ip}
                                        onChange={(e) => setIp(e.target.value)}
                                    />
                                </div>
                                <button type="submit">Registrar IP</button>
                            </form>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    {usersWithPlugins && Object.keys(usersWithPlugins).map((key) => {
                        if (key.startsWith('Antares') && key === 'AntaresCore' && usersWithPlugins[key]) {
                            return (
                                <div className="containerIP">
                                    <div className="cardIP">
                                        <p className='titulo'>AntaresCore.jar</p>
                                        <button className="donate-button"><a href="" className='semtexto'>Baixar</a></button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}

                </div>
            </div>

            <footer className="footer2">
                <p>AntaresPlugins © 2024</p>
            </footer>
        </>
    );
}

export default Dashboard;
