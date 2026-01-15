import Phaser from 'phaser';

/* =======================
   IMPORTAÇÃO DOS ASSETS
======================= */
import terraImg from './assets/terra.jpg';
import skyImg from './assets/sky.jpg';
import estrelasImg from './assets/estrelas.jpg';
import espacoImg from './assets/espaco.jpg';
import fimImg from './assets/fimDeJogo.jpg';

import groundImg from './assets/platform_tijolinho.png';
import nuvemImg from './assets/nuvem.png';
import sateliteImg from './assets/satelite.png';
import fogueteImg from './assets/foguete.png';
import planetaImg from './assets/planeta.png';

import starImg from './assets/star.png';
import chocolateImg from './assets/chocolate.png';
import meteoroImg from './assets/meteoro.png';
import opsImg from './assets/ops.png';

import personagemImg from './assets/personagem.png';

/* =======================
   CLASSE DO JOGO
======================= */
export class Game1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Game1Scene' });
        this.score = 0;
        this.plano = 'terra';
    }

    preload() {
        // Fundos
        this.load.image('terra', terraImg);
        this.load.image('sky', skyImg);
        this.load.image('estrelas', estrelasImg);
        this.load.image('espaco', espacoImg);
        this.load.image('fim', fimImg);

        // Plataformas (apenas imagens disponíveis)
        this.load.image('ground', groundImg);
        this.load.image('nuvem', nuvemImg);
        this.load.image('satelite', sateliteImg);
        this.load.image('foguete', fogueteImg);
        this.load.image('planeta', planetaImg);

        // Premiações
        this.load.image('star', starImg);
        this.load.image('chocolate', chocolateImg);
        this.load.image('meteoro', meteoroImg);
        this.load.image('ops', opsImg);

        // Personagem
        this.load.spritesheet('personagem', personagemImg, { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        // Fundo inicial
        this.bg = this.add.image(400, 300, 'terra');

        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.createPlataformas(this.plano);

        // Jogador
        this.player = this.physics.add.sprite(100, 450, 'personagem');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // Animações
        this.anims.create({ key: 'left', frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'turn', frames: [{ key: 'personagem', frame: 4 }], frameRate: 20 });
        this.anims.create({ key: 'right', frames: this.anims.generateFrameNumbers('personagem', { start: 5, end: 8 }), frameRate: 10, repeat: -1 });

        // Estrelas
        this.stars = this.physics.add.group();
        this.createStars('chocolate');

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        // Score
        this.scoreText = this.add.text(16, 16, 'Pontuação: 0', { fontSize: '32px', fill: '#000' });

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (!this.player) return;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    /* =======================
       FUNÇÕES AUXILIARES
    ======================= */
    createPlataformas(planoAtual) {
        this.platforms.clear(true, true);

        // Usa imagens que existem
        if (planoAtual === 'terra') {
            this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
            this.platforms.create(600, 400, 'ground');
            this.platforms.create(50, 220, 'ground');
            this.platforms.create(750, 250, 'ground');
        } else if (planoAtual === 'sky') {
            this.platforms.create(400, 568, 'nuvem').setScale(2).refreshBody();
            this.platforms.create(500, 400, 'nuvem');
            this.platforms.create(50, 250, 'nuvem');
            this.platforms.create(750, 220, 'nuvem');
        } else if (planoAtual === 'estrelas') {
            this.platforms.create(400, 568, 'satelite').setScale(2).refreshBody();
            this.platforms.create(400, 400, 'foguete');
            this.platforms.create(100, 250, 'foguete');
            this.platforms.create(750, 220, 'foguete');
        } else if (planoAtual === 'espaco') {
            this.platforms.create(400, 568, 'planeta').setScale(2).refreshBody();
            this.platforms.create(600, 400, 'planeta');
            this.platforms.create(200, 350, 'planeta');
            this.platforms.create(50, 250, 'planeta');
            this.platforms.create(450, 220, 'planeta');
            this.platforms.create(750, 200, 'planeta');
        }
    }

    createStars(starKey) {
        this.stars.clear(true, true);

        this.stars = this.physics.add.group({
            key: starKey,
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.stars.children.iterate(child => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
    }

    switchPlano(novoPlano) {
        this.plano = novoPlano;
        this.score = 0;

        const bgMap = { terra: 'terra', sky: 'sky', estrelas: 'estrelas', espaco: 'espaco' };
        this.bg.setTexture(bgMap[novoPlano]);

        this.createPlataformas(novoPlano);

        this.player.setPosition(100, 450);
        this.player.setVelocity(0, 0);

        const starMap = { terra: 'chocolate', sky: 'star', estrelas: 'meteoro', espaco: 'ops' };
        this.createStars(starMap[novoPlano]);

        this.scoreText.setText('Pontuação: 0');
    }

    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText('Pontuação: ' + this.score);

        if (this.score >= 120) {
            if (this.plano === 'terra') this.switchPlano('sky');
            else if (this.plano === 'sky') this.switchPlano('estrelas');
            else if (this.plano === 'estrelas') this.switchPlano('espaco');
            else if (this.plano === 'espaco') this.add.image(400, 300, 'fim');
        }
    }
}

/* =======================
   FUNÇÃO PARA INICIAR O JOGO
======================= */
export function startGame(parentElement) {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: parentElement,
        physics: { default: 'arcade', arcade: { gravity: { y: 300 }, debug: false } },
        scene: Game1Scene
    });
}
