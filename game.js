var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1900,
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

var game = new Phaser.Game(config);

var worldWidth = 9600;

function preload() {
        // Вставити фон і деталі гри(асети)
        this.load.image('fon', 'assets/fon.png');
        //this.load.image('', 'assets/fon.png'); вставити асети
}

function create() {
    
        // Створили фон плиткою
    this.add.tileSprite(0, 0, worldWidth, 1080, 'fon'). setOrigin(0,0);

}