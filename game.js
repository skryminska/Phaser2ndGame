var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent : game, 
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

var player;
var platforms;
var worldWidth = 9600;
var game = new Phaser.Game(config);

function preload() {
        // Вставити фон і деталі гри(асети)
        this.load.image('fon', 'assets/fon2.2.jpg');
        this.load.image('ground', 'assets/platform.png'); 
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        //додали нові асети
        this.load.image('bush', 'assets/Bush (1).png'); 
        this.load.image('mushroom', 'assets/Mushroom_1.png'); 
        this.load.image('stone', 'assets/Stone.png'); 
}

function create() {
        // Створили фон плиткою
    this.add.tileSprite(0, 0, worldWidth, 1080, 'fon'). setOrigin(0,0);

//Додали платформи, фіксація 
    platforms = this.physics.add.staticGroup();
    objects = this.physics.add.staticGroup();

    //додаємо цикл для землі на весь екран
        for (var x=0; x<worldWidth; x=x+32){
            console.log(x)
            platforms.create(x, 1080 - 250, 'ground').setOrigin(0,0).refreshBody();
        }

        //adding a new assets
        //this.add.tileSprite(0, 1, worldWidth, 1650, 'stone')

        //adds a new assets 
        for (var x=0; x<worldWidth; x = x + Phaser.Math.Between(200,800)){
            console.log(x)
            objects.create(x, 1080 - 250, 'stone').setOrigin(0,1).refreshBody();
            objects.create(x = x + Phaser.Math.Between(50,200) , 1080 - 250, 'bush').setOrigin(0,1).refreshBody();
            objects.create(x = x + Phaser.Math.Between(100,300) , 1080 - 250, 'mushroom').setOrigin(0,1).refreshBody();
        }


        //setDepth(objects, setScale(Phaser.Math.FloatBetween(0.5 , 1.5))

        
        //Створюємо гравця
        player = this.physics.add.sprite(1500,600,'dude');
        player.setBounce(0.2);
        player.setCollideWorldBounds(false);

        //Колізія гравцята платформи
        this.physics.add.collider(player, platforms);

        // налаштування камери
        this.cameras.main.setBounds(0, 0, worldWidth, 1080);
        this.physics.world.setBounds(0, 0, worldWidth, 1080);

        //Слідкування камери за гравцем 
        this.cameras.main.startFollow(player);

        //player = this.physics.add.sprite(228, 48, 'dude'); подивитися що там 

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    
        cursors = this.input.keyboard.createCursorKeys();
}

function update () {

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}