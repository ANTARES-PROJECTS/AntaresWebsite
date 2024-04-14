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
                    <h2>EM CONSTRUÇÃO!</h2>
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
