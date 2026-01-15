// src/game2.js
import Phaser from 'phaser';

// Assets do game2
import fundoImg from './assets/game2/fundo.png';
import jangadaImg from './assets/game2/jangada.png';
import perguntaImg from './assets/game2/pergunta.png';

import policial1Img from './assets/game2/policial1.png';
import policial2Img from './assets/game2/policial2.png';
import policial3Img from './assets/game2/policial3.png';
import ladrao1Img from './assets/game2/ladrao1.png';
import ladrao2Img from './assets/game2/ladrao2.png';
import ladrao3Img from './assets/game2/ladrao3.png';

export class Game2Scene extends Phaser.Scene {

    policialyInicial = 320;
    ladraoyInicial = 460;
    policialyFinal = 300;
    ladraoyFinal = 400;
    constructor() {
        super({ key: 'Game2Scene' });
        this.leftSide = [];
        this.rightSide = [];
        this.selected = [];
        this.boatSide = 'left';
    }

    preload() {
        this.load.image('fundo', fundoImg);
        this.load.image('jangada', jangadaImg);
        this.load.image('pergunta', perguntaImg);

        this.load.image('policial1', policial1Img);
        this.load.image('policial2', policial2Img);
        this.load.image('policial3', policial3Img);
        this.load.image('ladrao1', ladrao1Img);
        this.load.image('ladrao2', ladrao2Img);
        this.load.image('ladrao3', ladrao3Img);
    }

    create() {
        // Fundo
        this.add.image(400, 300, 'fundo');

        // Ícone de regras
        const help = this.add.image(780, 20, 'pergunta')
            .setScale(0.08)
            .setInteractive()
            .setDepth(10);

        help.on('pointerdown', () => {
            window.alert(
`REGRAS DO JOGO

🚣 A jangada leva 1 ou 2 pessoas

⚠️ REGRA PRINCIPAL:
Em nenhum lado do rio pode haver mais ladrões do que policiais,
SE existir ao menos um policial naquele lado.

✔ Se não houver policial, tudo bem
❌ Se houver policial, ladrões não podem ser maioria

✔ Combinações permitidas:
- 1 policial
- 1 ladrão
- 2 policiais
- 1 policial + 1 ladrão

🏆 Objetivo:
Levar todos para o lado direito`
            );
        });

        // Posições iniciais


        // Personagens lado esquerdo
        this.leftSide = [
            this.add.image(50, this.policialyInicial, 'policial1').setScale(0.4),
            this.add.image(120, this.policialyInicial, 'policial2').setScale(0.6),
            this.add.image(190, this.policialyInicial, 'policial3').setScale(0.07),
            this.add.image(80, this.ladraoyInicial, 'ladrao1').setScale(0.06),
            this.add.image(170, this.ladraoyInicial, 'ladrao2').setScale(0.3),
            this.add.image(240, this.ladraoyInicial, 'ladrao3').setScale(0.5)
        ];

        // Jangada
        this.boat = this.add.image(350, 400, 'jangada')
            .setScale(0.5)
            .setDepth(1);

        // Personagens à frente da jangada
        this.leftSide.forEach(s => s.setDepth(2));

        // Posições finais do lado direito
        this.rightPositions = {
            policial1: { x: 520, y: this.policialyFinal },
            policial2: { x: 600, y: this.policialyFinal },
            policial3: { x: 700, y: this.policialyFinal },
            ladrao1:   { x: 650, y: this.ladraoyFinal },
            ladrao2:   { x: 700, y: this.ladraoyFinal },
            ladrao3:   { x: 750, y: this.ladraoyFinal }
        };

        // Botão atravessar
        this.crossButton = this.add.dom(650, 520, 'button', {
            fontSize: '18px',
            padding: '6px 12px',
            cursor: 'pointer'
        }, 'Atravessar');

        this.crossButton.addListener('click');
        this.crossButton.on('click', () => this.crossBoat());

        // Ativa interação
        this.enableCharacterInteraction();
    }

    enableCharacterInteraction() {
        // Considera apenas sprites válidos que estejam na cena
        const allSprites = [...this.leftSide, ...this.rightSide].filter(s => s && s.scene);
        allSprites.forEach(sprite => {
            sprite.setInteractive();
            sprite.removeAllListeners();
            sprite.on('pointerdown', () => this.toggleSelect(sprite));
        });
    }

    toggleSelect(sprite) {
        const sideArray = this.boatSide === 'left' ? this.leftSide : this.rightSide;
        if (!sideArray.includes(sprite)) return;

        if (this.selected.includes(sprite)) {
            sprite.clearTint();
            this.selected = this.selected.filter(s => s !== sprite);
        } else {
            if (this.selected.length < 2) {
                this.selected.push(sprite);
                sprite.setTint(0x00ff00);
            }
        }
    }

    crossBoat() {
        if (this.selected.length === 0) return;

        const targetSide = this.boatSide === 'left' ? 'right' : 'left';
        const fromArray = this.boatSide === 'left' ? this.leftSide : this.rightSide;
        const toArray = targetSide === 'left' ? this.leftSide : this.rightSide;
        const boatTargetX = targetSide === 'left' ? 350 : 550;

        this.tweens.add({ targets: this.boat, x: boatTargetX, duration: 800 });

        this.selected.forEach((sprite, i) => {
            this.tweens.add({
                targets: sprite,
                x: boatTargetX + (i === 0 ? -20 : 20),
                y: 380,
                duration: 800,
                onComplete: () => {
                    fromArray.splice(fromArray.indexOf(sprite), 1);
                    toArray.push(sprite);

                    if (targetSide === 'right') {
                        const p = this.rightPositions[sprite.texture.key];
                        sprite.setPosition(p.x, p.y);
                    } else {
                        const key = sprite.texture.key;
                        if (key === 'policial1') sprite.setPosition(50, this.policialyInicial);
                        if (key === 'policial2') sprite.setPosition(120, this.policialyInicial);
                        if (key === 'policial3') sprite.setPosition(190, this.policialyInicial);
                        if (key === 'ladrao1')   sprite.setPosition(80, this.ladraoyInicial);
                        if (key === 'ladrao2')   sprite.setPosition(170, this.ladraoyInicial);
                        if (key === 'ladrao3')   sprite.setPosition(240, this.ladraoyInicial);
                    }

                    sprite.clearTint();
                }
            });
        });

        this.selected = [];
        this.boatSide = targetSide;

        // Valida regras após animação
        this.time.delayedCall(900, () => {
            if (!this.isValidState()) {
                const sceneRef = this;
                setTimeout(() => {
                    window.alert('❌ Você perdeu!\nRegra quebrada.');
                    sceneRef.scene.restart();
                }, 0);
                return;
            }

            // Vitória: todos os personagens estão no lado direito
            if (this.rightSide.length === 6) {
                setTimeout(() => {
                    window.alert('🎉 Parabéns! Você completou o desafio com sucesso! 🏆');
                    this.scene.restart(); 
                    // ou você pode redirecionar para outro menu/nivel
                }, 0);
            }
        });

        this.time.delayedCall(900, () => this.enableCharacterInteraction());
    }


    isValidState() {
        const checkSide = (side) => {
            const policiais = side.filter(s => s.texture.key.includes('policial')).length;
            const ladroes = side.filter(s => s.texture.key.includes('ladrao')).length;
            if (policiais === 0) return true;
            return ladroes <= policiais;
        };
        return checkSide(this.leftSide) && checkSide(this.rightSide);
    }
}

// Iniciar Game2
export function startGame2(parentElement) {
    new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: parentElement,
        dom: { createContainer: true },
        scene: Game2Scene
    });
}
