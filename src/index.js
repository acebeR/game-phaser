// src/index.js
import { startGame } from './game1.js';
import game1Img from './assets/game1.png';

const app = document.getElementById('app') || document.body;

// Menu
const menu = document.createElement('div');
menu.id = 'menu';
menu.style.display = 'flex';
menu.style.flexDirection = 'column';
menu.style.justifyContent = 'center';
menu.style.alignItems = 'center';
menu.style.height = '100vh';

// Adiciona o menu ao DOM primeiro
app.appendChild(menu);

// Conteúdo do menu - apenas imagens clicáveis
menu.innerHTML = `
    <h1>🎮 Meu Site de Jogos</h1>
    <div class="menu-buttons" style="display:flex; gap:20px;">
        <img id="game1Btn" src="${game1Img}" alt="Plataforma Espacial" class="menu-img">
        <img id="game2Btn" src="${game1Img}" alt="Atravessar o Rio" class="menu-img">
    </div>
`;

// Adiciona o CSS para hover
const style = document.createElement('style');
style.innerHTML = `
    .menu-img {
        width: 80px;
        height: 80px;
        cursor: pointer;
        transition: transform 0.2s;
    }
    .menu-img:hover {
        transform: scale(1.2);
    }
`;
document.head.appendChild(style);

// Container do jogo
const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';
app.appendChild(gameContainer);

// Eventos
document.getElementById('game1Btn').addEventListener('click', () => {
    menu.style.display = 'none';
    startGame(gameContainer);
});

document.getElementById('game2Btn').addEventListener('click', () => {
    alert('Jogo 2 ainda não implementado!');
});
