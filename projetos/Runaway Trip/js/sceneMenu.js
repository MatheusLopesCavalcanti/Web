class SceneMenu extends Phaser.Scene {
    constructor() {
        super('SceneMenu');
    }
    preload() {
        // carregando assets
        this.load.image('background', 'images/CenarioFundo.png');
        this.load.image('title', 'images/Int-GameTitle.png');
        this.load.image('play', 'images/Int-PlayButton.png');
    }
    create() {
        this.background = this.physics.add.sprite( game.config.width/2, game.config.height/2,'background');
        this.background.setOrigin(0.5, 0.5);
        this.background.setImmovable();
        this.background.scaleX = 2.3;
        this.background.scaleY = 2.3;
        this.title = this.physics.add.sprite( game.config.width/2, game.config.height/2,'title');
        this.title.scaleX = 2.3;
        this.title.scaleY = 2.3;
        this.title.setImmovable();
        this.play = this.physics.add.sprite( game.config.width/2, game.config.height/2 +150,'play');
        this.play.scaleX = 2.3;
        this.play.scaleY = 2.3;
        this.play.setImmovable();
        this.play.setInteractive();
        this.play.on('pointerdown', () => this.scene.start('SceneMain'));
    }

    playGame(){

    }

    update() {
        
    }
}