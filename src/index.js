import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import grama0 from './assets/fundo_grama_0_tijolinhos.jpg';
import boneca from './assets/boneca.png';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('logo', logoImg);
        this.load.image('grama0', grama0);
        this.load.image('boneca', boneca);
    }
      
    create ()
    {
        const fundo_grama = this.add.image(400, 300, 'grama0');
        const boneca = this.add.image(100, 500, 'boneca');

        
        // this.tweens.add({
        //     targets: logo,
        //     y: 450,
        //     duration: 2000,
        //     ease: "Power2",
        //     yoyo: true,
        //     loop: -1
        // });
    }
    update() {
        // this.player.x = game.input.x;
        // this.player.y = game.input.y;
        var cursors = this.input.keyboard.createCursorKeys();
        var player = {};
        if (cursors.left.isDown)
        {
            console.log("aqui");
            boneca.setVelocityX(-160);
        
            boneca.anims.play('left', true);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

const game = new Phaser.Game(config);
