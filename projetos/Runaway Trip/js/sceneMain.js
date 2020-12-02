class SceneMain extends Phaser.Scene {

    constructor() {
        super('SceneMain');
    }
    preload() {
        // carregando assets
        this.load.spritesheet('player', 'images/SpriteSheetTrip.png',  { frameWidth: 31, frameHeight: 32 });
        this.load.spritesheet('guard', 'images/SpriteSheetGuardinha.png', { frameWidth: 31, frameHeight: 32 });
        this.load.image('floor', 'images/CenarioRua.png')
        this.load.image('falseFloor', 'images/CenarioRua.png')
        this.load.image('obstacle1', 'images/ObstaculoBaixo1.png')
        this.load.image('obstacle2', 'images/ObstaculoBaixo2.png')
        this.load.image('obstacle3', 'images/ObstaculoBaixo3.png')
        this.load.image('obstacle4', 'images/ObstaculoCima1.png')
        this.load.image('obstacle5', 'images/ObstaculoCima2.png')
        this.load.image('obstacle6', 'images/ObstaculoCima3.png')
        this.load.image('background', 'images/CenarioFundo.png')
        //Parallax
        this.load.image('parallax', 'images/CenarioParallax.png')
        //Estruturas
        this.load.image('cenarioEstrutura1', 'images/CenarioEstrutura1.png')
        this.load.image('cenarioEstrutura2', 'images/CenarioEstrutura2.png')
        this.load.image('cenarioEstrutura3', 'images/CenarioEstrutura3.png')
        this.load.image('cenarioEstrutura4', 'images/CenarioEstrutura4.png')
        this.load.image('cenarioEstrutura5', 'images/CenarioEstrutura5.png')
        this.load.image('cenarioEstrutura6', 'images/CenarioEstrutura6.png')

        this.load.image('pause', 'images/Int-PauseMenu.png')
        this.load.image('return', 'images/Int-ReturnButton.png')
        this.load.image('gameOverText', 'images/Int-GameOver.png')
        this.load.audio('theme', 'musica do jogo 2.0.mp3');
    }
    create() {
        // adicionando assets na cena
        var music = this.sound.add('theme');
        music.loop = true;
        music.play();
        this.input.keyboard.on('keydown_ESC', this.pauseGame, this);
        this.isPaused = false;
        this.background = this.physics.add.sprite( game.config.width/2, game.config.height/2,'background');
        this.background.setOrigin(0.5, 0.5);
        this.background.setImmovable();
        this.background.scaleX = 2.3;
        this.background.scaleY = 2.3;
        //Parallax
        this.parallax1 =  this.add.sprite( game.config.width/2, game.config.height-43.5,'parallax');
        this.parallax1.setOrigin(0.5, 1);
        this.parallax1.scaleX = 2.3;
        this.parallax1.scaleY = 2.3;
        this.parallax2 =  this.add.sprite( game.config.width/2 - 640, game.config.height-43.5,'parallax');
        this.parallax2.setOrigin(0.5, 1);
        this.parallax2.scaleX = 2.3;
        this.parallax2.scaleY = 2.3;
        this.parallax3 =  this.add.sprite( game.config.width/2 + 640, game.config.height-43.5,'parallax');
        this.parallax3.setOrigin(0.5, 1);
        this.parallax3.scaleX = 2.3;
        this.parallax3.scaleY = 2.3;
        //Estruturas
        this.cenarioEstrutura1 =  this.add.sprite( -640, game.config.height-43.5,'cenarioEstrutura1');
        this.cenarioEstrutura1.setOrigin(0.5, 1);
        this.cenarioEstrutura1.scaleX = 2.3;
        this.cenarioEstrutura1.scaleY = 2.3;
        this.cenarioEstrutura2 =  this.add.sprite( -640, game.config.height-43.5,'cenarioEstrutura2');
        this.cenarioEstrutura2.setOrigin(0.5, 1);
        this.cenarioEstrutura2.scaleX = 2.3;
        this.cenarioEstrutura2.scaleY = 2.3;
        this.cenarioEstrutura3 =  this.add.sprite( -640, game.config.height-43.5,'cenarioEstrutura3');
        this.cenarioEstrutura3.setOrigin(0.5, 1);
        this.cenarioEstrutura3.scaleX = 2.3;
        this.cenarioEstrutura3.scaleY = 2.5;
        this.cenarioEstrutura4 =  this.add.sprite( -640, game.config.height-43.5,'cenarioEstrutura4');
        this.cenarioEstrutura4.setOrigin(0.5, 1);
        this.cenarioEstrutura4.scaleX = 2.3;
        this.cenarioEstrutura4.scaleY = 2.5;
        this.cenarioEstrutura5 =  this.add.sprite( -640, game.config.height-43.5,'cenarioEstrutura5');
        this.cenarioEstrutura5.setOrigin(0.5, 1);
        this.cenarioEstrutura5.scaleX = 2.3;
        this.cenarioEstrutura5.scaleY = 2.3;
        this.cenarioEstrutura6 =  this.add.sprite( -640, game.config.height-43.5,'cenarioEstrutura6');
        this.cenarioEstrutura6.setOrigin(0.5, 1);
        this.cenarioEstrutura6.scaleX = 2.3;
        this.cenarioEstrutura6.scaleY = 2.3;
        this.timeToSpawnEstrutura = 50;
        this.idEstruturaASpawnar = 0;
        //====
        this.floor = this.physics.add.sprite(300, game.config.height-10,'floor');
        this.falseFloor = this.physics.add.sprite(300, game.config.height-30,'floor');
        this.floor.setImmovable();
        this.floor.scaleX = 2.5;
        this.falseFloor.setImmovable();
        this.falseFloor.scaleX = 2.5;
        this.falseFloor.z = 0;
        this.player = this.physics.add.sprite(200, game.config.height-110, 'player'); //200
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
        this.life = 3;
        this.speed = 3;
        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        this.lifeText = this.add.text(20, 40, 'life: ' + this.life, style);
        this.obstacle1 = this.physics.add.sprite(600, game.config.height-40,'obstacle1'); //270
        this.obstacle1.scaleX = 2;
        this.obstacle1.scaleY = 2;
        this.obstacle2 = this.physics.add.sprite(1200, game.config.height-40,'obstacle2');
        this.obstacle2.scaleX = 2;
        this.obstacle2.scaleY = 2;
        this.obstacle3 = this.physics.add.sprite(2400, game.config.height-40,'obstacle3');
        this.obstacle3.scaleX = 2;
        this.obstacle3.scaleY = 2;
        this.obstacle4 = this.physics.add.sprite(4800, game.config.height-75,'obstacle4'); //235
        this.obstacle4.scaleX = 2;
        this.obstacle4.scaleY = 2;
        this.obstacle5 = this.physics.add.sprite(9600, game.config.height-75,'obstacle5');
        this.obstacle5.scaleX = 2;
        this.obstacle5.scaleY = 2;
        this.obstacle6 = this.physics.add.sprite(19200, game.config.height-75,'obstacle6');
        this.obstacle6.scaleX = 2;
        this.obstacle6.scaleY = 2;


        //Adicionando um novo esquema de spawnar objetos novoSpawn
        this.timeToSpawn = 300;
        this.idObjetoASpawnar = 0;
        //.timeToSpawnText = this.add.text(20, 60, 'time: ' + this.timeToSpawn, style);
        this.objetosPosicionadosIniciao = false;
        //

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
                { key: 'player',frame:9 },
                { key: 'player',frame:10 },
                { key: 'player',frame:11 },
                { key: 'player',frame:12 },
            ],
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'cry',
            frames: [
                { key: 'player',frame:16 },
                { key: 'player',frame:17 },
            ],
            frameRate: 12,
            repeat: -1
        });
        this.guard = this.physics.add.sprite(-50,game.config.height-110, 'guard');
        this.guard.setGravityY(200);
        this.guard.scaleX = 2;
        this.guard.scaleY = 2;
        this.guard.z = 2;
        this.physics.add.collider(this.guard,this.floor);
        this.anims.create({
            key: 'runAfter',
            frames: [
                { key: 'guard',frame:0 },
                { key: 'guard',frame:1 },
                { key: 'guard',frame:2 },
                { key: 'guard',frame:3 },
                { key: 'guard',frame:4 },
                { key: 'guard',frame:5 },
                { key: 'guard',frame:6 },
                { key: 'guard',frame:7 },
            ],
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'ketchum',
            frames: [
                { key: 'guard',frame:8 },
                { key: 'guard',frame:9 },
            ],
            frameRate: 12,
            repeat: -1
        });

        this.player.play('walk');
        this.guard.play('runAfter');
        
        this.player.on('roll', this.animComplete, this);
        this.pause = this.physics.add.sprite(-200,-200,'pause');
        this.pause.scaleX = 2;
        this.pause.scaleY = 2;
        this.return = this.physics.add.sprite(-200,-200,'return');
        this.return.scaleX = 2;
        this.return.scaleY = 2;
        this.return.setInteractive();
        this.return.on('pointerdown', () => this.pauseGame() );
        this.isGameOver = false;
        this.gameOverText = this.physics.add.sprite(-200,-200,'gameOverText');
        this.gameOverText.scaleX = 2;
        this.gameOverText.scaleY = 2;
        
    }

    avoidOverlap(o1, o2){
        var dist = o1.x - o2.x;
        if (Math.abs(dist) <= 50) {
        console.log(o1 +' ' +o2 +' ' +Math.abs(dist));
            o2.x += 100;
        }
    }
    pauseGame(){
        if(this.isGameOver){
            if(!this.isPaused){
                this.scene.restart();
            }
        }else{
            if(this.isPaused){
                this.speed = 3;
                this.player.setGravityY(200);
                this.player.anims.play();
                this.guard.anims.play();
                this.pause.x = -200;
                this.pause.y = -200;
                this.return.x = -200;
                this.return.y = -200;
                this.isPaused = false;
            }else{
                this.speed = 0;
                this.player.setGravityY(0);
                this.player.anims.stop();
                this.guard.anims.stop();
                this.pause.x = game.config.width/2;
                this.pause.y = game.config.height/2;
                this.return.x = game.config.width/2;
                this.return.y = game.config.height/2 +10;
                this.isPaused = true;
            }
        }
    }
    hit(obstacle) {
        if(this.life == 0){
            this.gameOver();
        }else{
            this.speed = 3;
            this.life -= 1;
        }
        
        this.lifeText.setText('life: ' + this.life);
        this.guard.x += 50;
        
        //this.spawnObstacle(obstacle);
        obstacle.x = -50;
    }

   /*  spawnObstacle(obstacle){                             Joguei fora pelo novoSpawn
        obstacle.x = 600 + Math.random()*2400;
        
    }*/

    //novoSpawn
    spawnObstacle(){
       
        this.idObjetoASpawnar = Math.random() * 6;
                
        if(this.idObjetoASpawnar < 1 && this.obstacle1.x < -10){
            this.idObjetoASpawnar = 7;
            this.timeToSpawn = 100 + Math.random() * 200;
            this.obstacle1.x = 700;
        }else if(this.idObjetoASpawnar >= 1 && this.idObjetoASpawnar < 2 && this.obstacle2.x < -20){
            this.idObjetoASpawnar = 7;
            this.timeToSpawn = 100 + Math.random() * 200;
            this.obstacle2.x = 700;
        }else if(this.idObjetoASpawnar >= 2 && this.idObjetoASpawnar < 3 && this.obstacle3.x < -20){
            this.idObjetoASpawnar = 7;
            this.timeToSpawn = 100 + Math.random() * 200;
            this.obstacle3.x = 700;
        }else if(this.idObjetoASpawnar >= 3 && this.idObjetoASpawnar < 4 && this.obstacle3.x < -20){
            this.idObjetoASpawnar = 7;
            this.timeToSpawn = 100 + Math.random() * 200;
            this.obstacle4.x = 700;
        }else if(this.idObjetoASpawnar >= 4 && this.idObjetoASpawnar < 5 && this.obstacle5.x < -20){
            this.idObjetoASpawnar = 7;
            this.timeToSpawn = 100 + Math.random() * 200;
            this.obstacle5.x = 700;
        }else if(this.idObjetoASpawnar >= 5 && this.idObjetoASpawnar < 6 && this.obstacle6.x < -20){
            this.idObjetoASpawnar = 7;
            this.timeToSpawn = 100 + Math.random() * 200;
            this.obstacle6.x = 700;
        }

    }

    //spawnando Estruturas
    spawnEstrutura(){
       
        this.idEstruturaASpawnar = Math.random() * 6;
                
        if(this.idEstruturaASpawnar < 1 && this.cenarioEstrutura1.x < -10){
            this.idEstruturaASpawnar = 7;
            this.timeToSpawnEstrutura = 100 + Math.random() * 400;
            this.cenarioEstrutura1.x = 900;
        }else if(this.idEstruturaASpawnar >= 1 && this.idEstruturaASpawnar < 2 && this.cenarioEstrutura2.x < -50){
            this.idEstruturaASpawnar = 7;
            this.timeToSpawnEstrutura = 100 + Math.random() * 400;
            this.cenarioEstrutura2.x = 900;
        }else if(this.idEstruturaASpawnar >= 2 && this.idEstruturaASpawnar < 3 && this.cenarioEstrutura3.x < -50){
            this.idEstruturaASpawnar = 7;
            this.timeToSpawnEstrutura = 100 + Math.random() * 400;
            this.cenarioEstrutura3.x = 900;
        }else if(this.idEstruturaASpawnar >= 3 && this.idEstruturaASpawnar < 4 && this.cenarioEstrutura4.x < -50){
            this.idEstruturaASpawnar = 7;
            this.timeToSpawnEstrutura = 100 + Math.random() * 400;
            this.cenarioEstrutura4.x = 900;
        }else if(this.idEstruturaASpawnar >= 4 && this.idEstruturaASpawnar < 5 && this.cenarioEstrutura5.x < -50){
            this.idEstruturaASpawnar = 7;
            this.timeToSpawnEstrutura = 100 + Math.random() * 400;
            this.cenarioEstrutura5.x = 900;
        }else if(this.idEstruturaASpawnar >= 5 && this.idEstruturaASpawnar < 6 && this.cenarioEstrutura6.x < -50){
            this.idEstruturaASpawnar = 7;
            this.timeToSpawnEstrutura = 100 + Math.random() * 400;
            this.cenarioEstrutura6.x = 900;
        }

    }
    //=====

    //Não funciona!!
    onFloor(player, floor){
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
    }

    moveObstacle (obstacle){
        //mudei pelo novoSpawn
        /*if(obstacle.x >= 0){
            obstacle.x -= 3;
        }else {
           // this.spawnObstacle(obstacle);
        }*/
        if(this.objetosPosicionadosIniciao == false){
            obstacle.x = -50;
            this.objetosPosicionadosIniciao = true;
        }
        obstacle.x -= this.speed;
        
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'jump') {
            if (this.physics.overlap(this.player, obstacle)) {
                this.hit(obstacle);
            }
        }
    }




    moveObstacleUp (obstacle){
        //mudei pelo novoSpawn
        /*if(obstacle.x >= 0){
            obstacle.x -= 3;
        }else {
            this.spawnObstacle(obstacle);
        }*/
        if(this.objetosPosicionadosIniciao == false){
            obstacle.x = -50;
            this.objetosPosicionadosIniciao = true;
        }
        obstacle.x -= this.speed;

        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'roll') {
            if (this.physics.overlap(this.player, obstacle)) {
                this.hit(obstacle);
            }
        }
        
    }
    moveObstacleFlying (obstacle){
        //mudei pelo novoSpawn
        /*if(obstacle.x >= 0){
            obstacle.x -= 3;
        }else {
            this.spawnObstacle(obstacle);
        }*/
        if(this.objetosPosicionadosIniciao == false){
            obstacle.x = -50;
            this.objetosPosicionadosIniciao = true;
        }
        obstacle.x -= this.speed*2;

        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key != 'roll') {
            if (this.physics.overlap(this.player, obstacle)) {
                this.hit(obstacle);
            }
        }
        
    }

    //Parallax
    moveParallax(cenario){
        if(cenario.x > -320){
            cenario.x -= this.speed/6;
        }else{
            cenario.x = 960;
        }
    }
    //Estruturas
    moveEstruturas(estrutura){
        estrutura.x -= this.speed;
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

    gameOver(){
        this.isGameOver = true;
        this.speed = 0;
        this.gameOverText.x = game.config.width/2;
        this.gameOverText.y = game.config.width/2 -50;
        this.return.x = game.config.width/2;
        this.return.y = game.config.height/2 +50;
        this.player.play('cry');
        this.guard.play('ketchum');
    }

    update() {
        //this.avoidallOverlap();
        if(!this.isPaused && !this.isGameOver){
            this.score += 1;
            this.scoreText.setText('score: ' + this.score);
            this.timeToSpawn -= 1;
            this.timeToSpawnEstrutura -= 1;
        }

        //reduzindo contador novoSpawn 
        
        //this.timeToSpawnText.setText('Time: ' + this.timeToSpawn);
        if(this.timeToSpawn < 0){
            this.spawnObstacle();
        }

        //reduzindo contador Estruturas
        if(this.timeToSpawnEstrutura < 0){
            this.spawnEstrutura();
        }
        //====

        // movimentações do player via setas teclado
        /*if (this.arrow.down._justDown) {
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
        */


        //Essa coisa linda aqui funcionou muito!
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'walk') {
            console.log('Player is walking')
            if (this.arrow.down.isDown) {
                this.player.play('roll');
            }
            if (this.arrow.up.isDown || this.arrow.space.isDown) {
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
            }else if (this.arrow.up.isDown || this.arrow.space.isDown) {
                // move para cima
                this.player.y -= 3;
            }
        }
        if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'roll') {
            console.log('Player is rolling')
            if (this.arrow.down.isUp) {
                // move para baixo
                this.player.play('walk');
            }
            if (this.arrow.up.isDown || this.arrow.space.isDown) {
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
        this.moveObstacleFlying (this.obstacle5)
        this.moveObstacleFlying (this.obstacle6)
        //Parallax
        this.moveParallax (this.parallax1)
        this.moveParallax (this.parallax2)
        this.moveParallax (this.parallax3)
        //Estruturas
        this.moveEstruturas(this.cenarioEstrutura1)
        this.moveEstruturas(this.cenarioEstrutura2)
        this.moveEstruturas(this.cenarioEstrutura3)
        this.moveEstruturas(this.cenarioEstrutura4)
        this.moveEstruturas(this.cenarioEstrutura5)
        this.moveEstruturas(this.cenarioEstrutura6)
        //
    }
}