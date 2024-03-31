var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: game,
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
var cursors
var resetButton;
var worldWidth = config.width * 10
var game = new Phaser.Game(config);
var playerSpeed = 1000
var score = 0
var scoreText
var stars


function preload() {
    // Вставити фон і деталі гри(асети)
    this.load.image('fon', 'assets/fon2.2.jpg');
    this.load.image('ground', 'assets/platform.png'); //замінти!
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    //додали нові асети
    this.load.image('bush', 'assets/Bush (1).png');
    this.load.image('mushroom', 'assets/Mushroom_1.png'); //зам 
    this.load.image('stone', 'assets/Stone.png');

    //sky platforms
    this.load.image('skyGroundStart', 'assets/Tiles/13.png');
    this.load.image('skyGround', 'assets/Tiles/14.png');
    this.load.image('skyGroundEnd', 'assets/Tiles/15.png');

    this.load.image('star', 'assets/star.png');
}

function create() {
    // Створили фон плиткою
    this.add.tileSprite(0, 0, worldWidth, 1080, 'fon')
        .setOrigin(0, 0)
        .setScale(1)
        .setDepth(0);

    //Додали платформи, фіксація 
    platforms = this.physics.add.staticGroup();

    //додаємо цикл для землі на весь екран
    for (var x = 0; x < worldWidth; x = x + 32) {
        //console.log(x)
        platforms.create(x, 1080 - 250, 'ground')
            .setOrigin(0, 0)
            .refreshBody();
    }


    //adds a new assets 
    objects = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(200, 800)) {
        //console.log(x)
        objects.create(x, 1080 - 250, 'stone')
            .setOrigin(0, 1)
            .refreshBody();

        objects.create(x = x + Phaser.Math.Between(50, 200), 1080 - 250, 'bush')
            .setOrigin(0, 1)
            .refreshBody();

        objects.create(x = x + Phaser.Math.Between(100, 300), 1080 - 250, 'mushroom')
            .setOrigin(0, 1)
            .refreshBody();
    }


    //setDepth(objects, setScale(Phaser.Math.FloatBetween(0.5 , 1.5))


    //Створюємо гравця
    player = this.physics.add.sprite(1500, 600, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);y


    //додаємо кнопку перезавантаження 
    resetButton = this.add.image(900, 500, 'resetButton')
    resetButton.setOrigin(0, 0)
        .setDepth(10)
        .setScrollFactor(0)
        .setInteractive()
        .on('pointerdown', function () {
            // Перезавантаження гри
            location.reload();
        });

    resetButton.setVisible(false);

    //Колізія гравцята платформи
    this.physics.add.collider(player, platforms);

    // налаштування камери
    this.cameras.main.setBounds(0, 0, worldWidth, 1080);
    this.physics.world.setBounds(0, 0, worldWidth, 1080);

    //Слідкування камери за гравцем 
    this.cameras.main.startFollow(player);

    //player = this.physics.add.sprite(228, 48, 'dude'); подивитися що там 

    //рух гравця 
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    // створюємо літаючі платформи 
    for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(800, 1000)) {
        var y = Phaser.Math.Between(200, 690)

        platforms.create(x, y, 'skyGroundStart')
        var l
        for (l = 1; l <= Phaser.Math.Between(1, 4); l++) {
            platforms.create(x + 128 * l, y, 'skyGround')
        }
        platforms.create(x + 128 * l, y, 'skyGroundEnd')
    }

    //додаємо зіроки 
    stars = this.physics.add.group({
        key: 'star',
        repeat: 1200,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));

    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(player, stars, collectStar, null, this);


    // рахунок
    scoreText = this.add.text(100, 100, 'Score : 0', { fontSize: '20px', fill: '#FFF' })
        .setOrigin(0, 0)
        .setScrollFactor(0)

    //життя персонажа
    //lifeText = this.add.text(800, 100, showLife(), { fontSize: '40px', foll: '#FFF'})
    //.setIrigin(0, 0)
    //.setScrollFactor(0)



    //reset button
        var resetButton = this.add.text(400, 450, 'reset', { fontSize: '40px', fill: '#ccc'})
        //.setInteractive()
        //.setScrollFactor(0);

    //resetButton.on( 'pointerdown', function () {
    //console.log( 'restart')
    //refreshBody()
    //});


    // формування смуги життя 
    //function showLife () {
    //var lifeLine = ''

    //for (var i = 0: i < life; i++) {
    //lifeLine = lifeLine + ''



    //}

    //return lifeLine
    //}
}

function update() {

    //

    // керування
    if (cursors.left.isDown) {
        player.setVelocityX(-playerSpeed);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(playerSpeed);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-530);
    }



}

//colecting 
function collectStar(player, stars) {
    stars.disableBody(true, true);
    
    score += 1;
    scoreText.setText('Score: ' + score);


}
