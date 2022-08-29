import Phaser from 'phaser';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var score = 0;
var scoreText;
var plano = "terra";

function preload ()
{
    // Fundo
    this.load.image('terra', 'src/assets/terra.jpg');
    this.load.image('sky', 'src/assets/sky.jpg');
    this.load.image('estrelas', 'src/assets/estrelas.jpg');
    this.load.image('espaco', 'src/assets/espaco.jpg');
    // Plataformas
    this.load.image('ground', 'src/assets/platform_tijolinho.png');
    this.load.image('ground_nuvem', 'src/assets/gound_nuvem.png');
    this.load.image('nuvem', 'src/assets/nuvem.png');
    this.load.image('satelite', 'src/assets/satelite.png');
    this.load.image('foguete', 'src/assets/foguete.png');
    this.load.image('ground_planeta', 'src/assets/gound_planeta.png');
    this.load.image('planeta', 'src/assets/planeta.png');
    // Premiação
    this.load.image('star', 'src/assets/star.png');
    // this.load.image('bomb', 'assets/bomb.png');
    // Bonequinho
    this.load.spritesheet('personagem','src/assets/personagem.png',{ frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    this.add.image(400, 300, 'terra');

    this.platform_tijolinhos = this.physics.add.staticGroup();
    this.platform_tijolinhos.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platform_tijolinhos.create(600, 400, 'ground');
    this.platform_tijolinhos.create(50, 220, 'ground');
    this.platform_tijolinhos.create(800, 250, 'ground');


    this.player = this.physics.add.sprite(100, 450, 'personagem');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platform_tijolinhos);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'personagem', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('personagem', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    this.stars.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    });
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(this.stars, this.platform_tijolinhos);
    this.physics.add.overlap(this.player, this.stars,collectStar, null, this);

   
}


function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    console.log('Plano:',plano);
    console.log('jogador:',this.player);

    if(score === 120){
        if(plano != 'espaco' && plano === "terra"){
            score = 0;
            plano = "sky";
            this.add.image(400, 300, 'sky');
            this.platform_tijolinhos = this.physics.add.staticGroup();
            this.platform_tijolinhos.create(400, 568, 'ground_nuvem').setScale(2).refreshBody();
            this.platform_tijolinhos.create(500, 400, 'nuvem');
            this.platform_tijolinhos.create(50, 250, 'nuvem');
            this.platform_tijolinhos.create(750, 220, 'nuvem');

            this.player = this.physics.add.sprite(100, 450, 'personagem');
            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);
            this.physics.add.collider(this.player, this.platform_tijolinhos);

        }else
        if(plano != 'espaco' &&  plano === "sky"){
            score = 0;
            plano = "estrelas";
            this.add.image(400, 300, 'estrelas');
            this.platform_tijolinhos = this.physics.add.staticGroup();
            this.platform_tijolinhos.create(400, 568, 'satelite').setScale(2).refreshBody();
            this.platform_tijolinhos.create(400, 400, 'foguete');
            this.platform_tijolinhos.create(100, 250, 'foguete');
            this.platform_tijolinhos.create(750, 220, 'foguete');

            this.player = this.physics.add.sprite(100, 450, 'personagem');
            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);
            this.physics.add.collider(this.player, this.platform_tijolinhos);
        }else     
        if(plano != 'espaco' &&  plano === "estrelas"){
            plano = "espaco";
            this.add.image(400, 300, 'espaco');

            this.platform_tijolinhos = this.physics.add.staticGroup();
            this.platform_tijolinhos.create(400, 568, 'ground_planeta').setScale(2).refreshBody();
            this.platform_tijolinhos.create(600, 400, 'planeta');
            this.platform_tijolinhos.create(200, 350, 'planeta');
            this.platform_tijolinhos.create(50, 250, 'planeta');
            this.platform_tijolinhos.create(450, 220, 'planeta');
            this.platform_tijolinhos.create(750, 200, 'planeta');

            this.player = this.physics.add.sprite(100, 450, 'personagem');
            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);
            this.physics.add.collider(this.player, this.platform_tijolinhos);

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'turn',
                frames: [ { key: 'personagem', frame: 4 } ],
                frameRate: 20
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('personagem', { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1
            });

            this.stars = this.physics.add.group({
                key: 'star',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            });
            
            this.stars.children.iterate(function (child) {
            
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            
            });
            scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
            this.physics.add.collider(this.stars, this.platform_tijolinhos);
            this.physics.add.overlap(this.player, this.stars,collectStar, null, this);
        }

    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('personagem', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'personagem', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('personagem', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        this.stars.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.physics.add.collider(this.stars, this.platform_tijolinhos);
        this.physics.add.overlap(this.player, this.stars,collectStar, null, this);
    }
}

function update ()
{
    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {

        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-330);
    }

}