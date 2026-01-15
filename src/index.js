import { startGame } from './game1.js';
import { startGame2 } from './game2.js';
import game1Img from './assets/game1/game1.png';
import game2Img from './assets/game2/fundo1.png'; 

const app = document.getElementById('app') || document.body;

const menu = document.createElement('div');
menu.id = 'menu';
menu.style.display = 'flex';
menu.style.flexDirection = 'column';
menu.style.justifyContent = 'center';
menu.style.alignItems = 'center';
menu.style.height = '100vh';

menu.innerHTML = `
    <h1>🎮 Meu Site de Jogos</h1>
    <div style="display:flex; gap:20px;">
        <img id="game1Btn" src="${game1Img}" alt="Plataforma Espacial"
             style="width:80px; height:80px; cursor:pointer; transition: transform 0.2s;">
        <img id="game2Btn" src="${game2Img}" alt="Atravessar o Rio"
             style="width:80px; height:80px; cursor:pointer; transition: transform 0.2s;">
    </div>
`;

// Hover
menu.querySelectorAll('img').forEach(img => {
    img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.2)');
    img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
});

app.appendChild(menu);

const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';
app.appendChild(gameContainer);

// Eventos
document.getElementById('game1Btn').addEventListener('click', () => {
    menu.style.display = 'none';
    startGame(gameContainer);
});
document.getElementById('game2Btn').addEventListener('click', () => {
    menu.style.display = 'none';
    startGame2(gameContainer);
});
