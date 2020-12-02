class SM extends Phaser.Scene {

    constructor() {
        super('SceneMain');
    }
    preload() {
        // carregando assets
        this.load.spritesheet('player', 'images/SpriteSheetTrip.png',  { frameWidth: 31, frameHeight: 32 });
        this.load.image('floor', 'images/CenarioRua.png')
        this.load.image('falseFloor', 'images/CenarioRua.png')
        this.load.image('obstacle1', 'images/ObstaculoBaixo1.png')
        this.load.image('obstacle2', 'images/ObstaculoBaixo2.png')
        this.load.image('obstacle3', 'images/ObstaculoBaixo3.png')
        this.load.image('obstacle4', 'images/ObstaculoCima1.png')
        this.load.image('obstacle5', 'images/ObstaculoCima2.png')
        this.load.image('obstacle6', 'images/ObstaculoCima3.png')
        this.load.image('background', 'images/CenarioFundo.png')
        //this.load.image('coin', 'images/coin.png');
        
    }
    create() {
        // adicionando assets na cena
        
        var isWalking = new Boolean(false);
        var isRolling = new Boolean(false);
        this.background = this.physics.add.sprite(300,150,'background');
        this.background.setImmovable();
        this.background.scaleX = 2.5;
        this.background.scaleY = 2;
        this.floor = this.physics.add.sprite(300,300,'floor');
        this.falseFloor = this.physics.add.sprite(300,280,'floor');
        this.floor.setImmovable();
        this.floor.scaleX = 2.5;
        this.falseFloor.setImmovable();
        this.falseFloor.scaleX = 2.5;
        this.falseFloor.z = 0;
        this.player = this.physics.add.sprite(200, 200, 'player');
        this.player.setGravityY(200);
        this.player.scaleX = 2;
        this.player.scaleY = 2;
        this.player.z = 2;
        this.physics.add.collider(this.player,this.floor);
        //Isso não funciona ;-;
        this.physics.world.collide(this.player, this.floor, this.onFloor);
        this.player.setInteractive();
        //adicionando score
        this.score = 0;
        this.life = 0;
        //Adicionando um novo esquema de spawnar objetos novoSpawn
        this.timeSinceSpawn = 0;
        this.timeToSpawn = 300;
        this.idObjetoASpawnar = 0;
        //
        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        this.lifeText = this.add.text(20, 40, 'life: ' + this.score, style);
        this.obstacle1 = this.physics.add.sprite(600,270,'obstacle1');
        this.obstacle1.scaleX = 2;
        this.obstacle1.scaleY = 2;
        this.obstacle2 = this.physics.add.sprite(1200,270,'obstacle2');
        this.obstacle2.scaleX = 2;
        this.obstacle2.scaleY = 2;
        this.obstacle3 = this.physics.add.sprite(2400,270,'obstacle3');
        this.obstacle3.scaleX = 2;
        this.obstacle3.scaleY = 2;
        this.obstacle4 = this.physics.add.sprite(4800,235,'obstacle4');
        this.obstacle4.scaleX = 2;
        this.obstacle4.scaleY = 2;
        this.obstacle5 = this.physics.add.sprite(9600,235,'obstacle5');
        this.obstacle5.scaleX = 2;
        this.obstacle5.scaleY = 2;
        this.obstacle6 = this.physics.add.sprite(19200,235,'obstacle6');
        this.obstacle6.scaleX = 2;
        this.obstacle6.scaleY = 2;

        // adicionando interação pelo teclado
        this.arrow = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'player',frame:0 },
                { key: 'player',frame:1 },
                { key: 'player',frame:2 },
                { key: 'player',frame:3 },
                { key: 'player',frame:4 },
                { key: 'player',frame:5 },
                { key: 'player',frame:6 },
                { key: 'player',frame:7 },
            ],
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: [
                { key: 'player',frame:14 },
                { key: 'player',frame:15 },
            ],
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'roll',
            frames: [
                { key: 'player',frame:10 },
                { key: 'player',frame:11 },
            ],
            frameRate: 12,
            repeat: -1
        });
        this.player.play('walk');
        
        this.player.on('roll', this.animComplete, this);
    }

    avoidOverlap(o1, o2){
        var dist = o1.x - o2.x;
        if (Math.abs(dist) <= 50) {
        console.log(o1 +' ' +o2 +' ' +Math.abs(dist));
            o2.x += 100;
        }
    }
    
    hit(obstacle) {
        this.life -= 1;
        this.lifeText.setText('life: ' + this.life);
        this.spawnObstacle(obstacle);
    }

    spawnObstacle(obstacle){
        //obstacle.x = 600 + Math.random()*2400;

        //Matheus
        if(obstacle.x < 0){
            obstacle.x = 660;
            this.timeSinceSpawn = 0;
            this.timeToSpawn= 50 + Math.random()*400;
        }
        
        
    }
    //Não funciona!!
    /*onFloor(player, floor){
        this.score += 1;
        this.scoreText.setText('score: ' + this.score);
        if(!isWalking){
            this.player.play('walk');
            //isOnFloor = new Boolean(true);
        }
        
    }
    //Nem sei se funciona
    animComplete(){
        this.player.play('walk');
        this.isWalking = false;
        this.isRolling = false;
    }*/ 

    moveObstacle (obstacle){
        if(obstacle.x >= 0){
            obstacle.x -= 3;
        }else {
            //this.spawnObstacle(obstacle);
        }
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'jump') {
            if (this.physics.overlap(this.player, obstacle)) {
                this.hit(obstacle);
            }
        }
    }
    moveObstacleUp (obstacle){
        if(obstacle.x >= 0){
            obstacle.x -= 3;
        }else {
            this.spawnObstacle(obstacle);
        }
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'roll') {
            if (this.physics.overlap(this.player, obstacle)) {
                this.hit(obstacle);
            }
        }
        
    }

    avoidallOverlap(){
        this.avoidOverlap(this.obstacle1, this.obstacle2);
        this.avoidOverlap(this.obstacle1, this.obstacle3);
        this.avoidOverlap(this.obstacle1, this.obstacle4);
        this.avoidOverlap(this.obstacle1, this.obstacle5);
        this.avoidOverlap(this.obstacle1, this.obstacle6);
        this.avoidOverlap(this.obstacle2, this.obstacle3);
        this.avoidOverlap(this.obstacle2, this.obstacle4);
        this.avoidOverlap(this.obstacle2, this.obstacle5);
        this.avoidOverlap(this.obstacle2, this.obstacle6);
        this.avoidOverlap(this.obstacle3, this.obstacle4);
        this.avoidOverlap(this.obstacle3, this.obstacle5);
        this.avoidOverlap(this.obstacle3, this.obstacle6);
        this.avoidOverlap(this.obstacle4, this.obstacle5);
        this.avoidOverlap(this.obstacle4, this.obstacle6);
        this.avoidOverlap(this.obstacle5, this.obstacle6);
    }

    update() {
      //  this.avoidallOverlap();
        this.score += 1;
        this.scoreText.setText('score: ' + this.score);

        //Tempo a spawnar
       /* this.timeSinceSpawn += 1;
        if(this.timeSinceSpawn >= this.timeToSpawn){
            this.idObjetoASpawnar = Math.round(1 + Math.random() * 6)
            if(this.idObjetoASpawnar == 1){
                this.spawnObstacle(this.obstacle1);
            }else if(this.idObjetoASpawnar == 2){
                this.spawnObstacle(this.obstacle2);
            }else if(this.idObjetoASpawnar == 3){
                this.spawnObstacle(this.obstacle3);
            }else if(this.idObjetoASpawnar == 4){
                this.spawnObstacle(this.obstacle4);
            }else if(this.idObjetoASpawnar == 5){
                this.spawnObstacle(this.obstacle5);
            }else if(this.idObjetoASpawnar == 6){
                this.spawnObstacle(this.obstacle6);
            }
            
        }*/

        // movimentações do player via setas teclado
        if (this.arrow.down._justDown) {
            // move para baixo
            this.player.y += 3;
            if(this.isWalking == true){
                this.player.anims.play('roll',false);
                this.isRolling = true;
            }
        } else if (this.arrow.up.isDown) {
            // move para cima
            this.player.y -= 3;
            this.player.play('jump');
            this.isWalking = false;
        }
        
        //Essa coisa linda aqui funcionou muito!
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'walk') {
            console.log('Player is walking')
            if (this.arrow.down.isDown) {
                this.player.play('roll');
            }
            if (this.arrow.up.isDown) {
                // move para cima
                this.player.y -= 3;
                this.player.play('jump');
                this.isWalking = false;
            }
        }
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'jump') {
            console.log('Player is jumping')
            if (this.physics.overlap(this.player, this.falseFloor)) {
                if(this.isWalking == false){
                this.player.play('walk');
                this.isWalking = true;
                }
            }
            if (this.arrow.down.isDown) {
                // move para baixo
                this.player.y += 3;
            }else if (this.arrow.up.isDown) {
                // move para baixo
                this.player.y -= 3;
            }
        }
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'roll') {
            console.log('Player is rolling')
            if (this.arrow.down.isUp) {
                // move para baixo
                this.player.play('walk');
            }
            if (this.arrow.up.isDown) {
                // move para cima
                this.player.y -= 3;
                this.player.play('jump');
                this.isWalking = false;
            }
        }
        this.moveObstacle (this.obstacle1)
        this.moveObstacle (this.obstacle2)
        this.moveObstacle (this.obstacle3)
        this.moveObstacleUp (this.obstacle4)
        this.moveObstacleUp (this.obstacle5)
        this.moveObstacleUp (this.obstacle6)
    }
}