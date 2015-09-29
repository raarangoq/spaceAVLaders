
// Variables para controlar la entrada por teclado
var keyboard;

var text;

loading = {
	preload: function(){

text = game.add.text(20, 540, 'Cargando...', { fontSize: '28px', fill: '#ffffff'});
text.fixedToCamera = true;

    game.load.image('bullet', 'assets/pics/bullet.png');
    game.load.image('enemyBullet', 'assets/pics/enemys/enemy-bullet.png');

    game.load.spritesheet('drone', 'assets/pics/enemys/drone.png', 32, 32);
    game.load.spritesheet('leader', 'assets/pics/enemys/leader.png', 16, 16);

    game.load.image('ship', 'assets/pics/player.png');
    game.load.spritesheet('kaboom', 'assets/pics/explode.png', 128, 128);
    game.load.image('starfield', 'assets/pics/starfield.png');

    game.load.spritesheet('item', 'assets/pics/heart.png', 14, 16);

    game.load.image('end', 'assets/pics/images/end.png');
    game.load.image('initmenu', 'assets/pics/images/initmenu.png');
    game.load.image('lose', 'assets/pics/images/lose.png');
    game.load.image('pause', 'assets/pics/images/pause.png');
    game.load.image('win', 'assets/pics/images/win.png');



	game.load.audio('inicio', 'assets/sounds/inicio.mp3');
    game.load.audio('levelA', 'assets/sounds/levelA.mp3');
    game.load.audio('levelB', 'assets/sounds/levelB.mp3');
    game.load.audio('final', 'assets/sounds/final.mp3');

    game.load.audio('item', 'assets/sounds/item.mp3');
    game.load.audio('rugido', 'assets/sounds/rugido.mp3');

	},

	
	create: function(){
		addKeyboard();

		game.state.start('initMenu');
		//game.state.start('end');
	}
}
