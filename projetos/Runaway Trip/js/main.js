var game;
window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 640,
        height: 640,
        pixelArt: true,
        backgroundColor: '#3498db',
        parent: 'phaser-game',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        scene: [SceneMenu, SceneMain],
        audio: {
            disableWebAudio: true
        }
    };
    game = new Phaser.Game(config);
}