
// Variables para controlar la entrada por teclado
var keyboard;

var text;

loading = {
	preload: function(){

text = game.add.text(20, 540, 'Cargando...', { fontSize: '28px', fill: '#ffffff'});
text.fixedToCamera = true;

    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('enemyBullet', 'assets/enemys/enemy-bullet.png');

    game.load.spritesheet('drone', 'assets/enemys/drone.png', 32, 32);
    game.load.spritesheet('leader', 'assets/enemys/leader.png', 16, 16);

    game.load.image('ship', 'assets/player.png');
    game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
    game.load.image('starfield', 'assets/starfield.png');

    game.load.spritesheet('item', 'assets/heart.png', 14, 16);

    game.load.image('end', 'assets/images/end.png');
    game.load.image('initmenu', 'assets/images/initmenu.png');
    game.load.image('lose', 'assets/images/lose.png');
    game.load.image('pause', 'assets/images/pause.png');
    game.load.image('win', 'assets/images/win.png');



	//game.load.audio('roar', 'assets/sounds/rugido.mp3');


	},

	
	create: function(){
		addKeyboard();

		game.state.start('initMenu');
		//game.state.start('end');
	}
}
