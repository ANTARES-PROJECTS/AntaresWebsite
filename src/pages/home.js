import React from 'react';

function Home() {
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


            <div class="container">
                <div class="card">
                    <h2>Bem-vindo à AntaresPlugins!</h2>
                    <p>Somos especialistas em criar plugins para servidores Bukkit, oferecendo ferramentas poderosas para personalizar e aprimorar a experiência do seu servidor. Nossa equipe garante alta qualidade e compatibilidade, proporcionando soluções que elevam seu servidor a novos patamares. Explore nosso catálogo e descubra como podemos transformar sua visão em realidade virtual.</p>
                </div>
                <div>
                    <iframe src="https://discord.com/widget?id=818843587676602378&theme=dark" width="350" height="418"
                        allowtransparency="true" frameborder="0"
                        sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                </div>
            </div>

            <footer class="footer">
                <p>AntaresPlugins © 2024</p>
            </footer>
        </>
    );
}

export default Home;
